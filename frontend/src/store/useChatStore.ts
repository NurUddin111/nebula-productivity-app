/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

type IUser = {
  _id: string;
  fullName: string;
  email: string;
  profilePic: string;
};

type IMessage = {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string | null;
  createdAt: Date;
};

type chatStore = {
  allContacts: IUser[];
  chats: IUser[];
  messages: IMessage[];
  activeTab: "chats" | "contacts";
  selectedUser: IUser | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  setActiveTab: (tab: "chats" | "contacts") => void;
  setSelectedUser: (selectedUser: IUser | null) => void;
  getMyChatPartners: () => void;
  getAllContacts: () => void;
  getMessagesByUserId: (userId: string) => void;
  sendMessage: (messageData: { text: string; image: string | null }) => void;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
};

export const useChatStore = create<chatStore>()((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

  toggleSound: () => {
    const nextValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", String(nextValue));
    set({ isSoundEnabled: nextValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: { text: string; image: string | null }) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    if (!authUser) return;
    if (!selectedUser) return;

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date(),
    };
    // immidetaly update the ui by adding the message
    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
      );
      set({ messages: messages.concat(res.data) });
    } catch (error: any) {
      // remove optimistic message on failure
      set({ messages: messages });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });

      if (isSoundEnabled) {
        const notificationSound = new Audio(
          "/sounds/frontend_public_sounds_notification.mp3",
        );

        notificationSound.currentTime = 0;
        notificationSound
          .play()
          .catch((e) => console.error("Audio play failed:", e));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
}));
