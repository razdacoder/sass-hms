import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStoreType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
    }),
    {
      name: "user",
    }
  )
);
