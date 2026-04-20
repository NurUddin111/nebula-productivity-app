/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io, type Socket } from "socket.io-client";

type authStore = {
  authUser: {
    _id: string;
    email: string;
    fullName: string;
    profilePic: string;
  } | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  socket: Socket | null;
  onlineUsers: string[];
  checkAuth: () => void;
  signup: (data: { fullName: string; email: string; password: string }) => void;
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
  updateProfile: (data: { profilePic: string }) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
};

const BASE_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = create<authStore>()((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log(res);
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error in auth check:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");

      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message);
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
    });

    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
