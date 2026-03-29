/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

type authStore = {
  authUser: {
    _id: string;
    email: string;
    fullName: string;
    profilePic: string;
  } | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  checkAuth: () => void;
  signup: (data: { fullName: string; email: string; password: string }) => void;
};

export const useAuthStore = create<authStore>()((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log(res);
      set({ authUser: res.data });
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
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
