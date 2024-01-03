import Spinner from "@/components/ui/spinner";
import { Heading2 } from "@/components/ui/typography";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";
import * as z from "zod";
import { DataTable } from "../../components/ui/data-table";
import CreateEditForm from "./create-edit-form";
import { roomColumns } from "./room-colums";
import { useRooms } from "./useRooms";

export const roomSchema = z.object({
  room_number: z
    .string()
    .min(3, { message: "Room number should be at least 3 characters" }),
  room_type: z.string().min(1, { message: "Room type must not be empty" }),
  max_capacity: z.string().max(2),
  price: z.string(),
  discount_price: z.string(),
});

export default function RoomPage() {
  const { isLoading, rooms } = useRooms();
  //   const { opens, setOpen, setIsOpen } = useModalStore();
  const [open, setOpen] = React.useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading2>All rooms</Heading2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex gap-x-3 font-medium items-center">
              <Plus className="w-4 h-4" />
              Add room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add room</DialogTitle>
            </DialogHeader>
            <CreateEditForm setOpen={(value) => setOpen(value)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="">
        <DataTable columns={roomColumns} data={rooms} />
      </div>
    </>
  );
}
