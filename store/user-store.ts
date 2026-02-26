import { IUser } from "@/lib/user/types";
import { create } from "zustand";

interface UserStore {
  user: IUser | null
  setUser: (user: IUser | null) => void
}

export const useAuthStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}))