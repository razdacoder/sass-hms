import { create } from "zustand";
import { persist } from "zustand/middleware";
// import type { User } from "./types";

interface AuthStoreType {
  isAuthenticaed: boolean;
  setIsAuthenticaed: (value: boolean) => void;
}

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      isAuthenticaed: false,
      setIsAuthenticaed: (value: boolean) => set({ isAuthenticaed: value }),
    }),
    {
      name: "isAuthenticated",
    }
  )
);
