import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

type ModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

export function Modal({ trigger, children }: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
}
