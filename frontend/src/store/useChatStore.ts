/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

type IUser = {
  _id: string;
  fullName: string;
  email: string;
  profilePic: string;
};

// type IChat = {
//   _id: string;
// };

type chatStore = {
  allContacts: IUser[];
  chats: IUser[];
  messages: string[];
  activeTab: "chats" | "contacts";
  selectedUser: IUser | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  setActiveTab: (tab: "chats" | "contacts") => void;
  setSelectedUser: (selectedUser: IUser) => void;
  getMyChatPartners: () => void;
  getAllContacts: () => void;
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
}));
