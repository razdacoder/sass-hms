import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/useModal";
import React from "react";

type ModalProps = {
  formName: string;
  children: React.ReactNode;
};

export function Modal({ children, formName }: ModalProps) {
  const { isOpen, setIsOpen } = useModalStore();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{formName}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
