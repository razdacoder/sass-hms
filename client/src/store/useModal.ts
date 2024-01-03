import { create } from "zustand";

interface ModalType {
  isOpen: boolean;
  opens: "roomCreate" | "roomEdit" | null;
  setOpen: (value: "roomCreate" | "roomEdit" | null) => void;
  setIsOpen: (value: boolean) => void;
}

export const useModalStore = create<ModalType>()((set) => ({
  isOpen: false,
  opens: null,
  setOpen: (value: "roomCreate" | "roomEdit" | null) => set({ opens: value }),
  setIsOpen: (value: boolean) => set({ isOpen: value }),
}));
