import { formatPriceToNaira } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Minus, MoreVertical, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import CreateEditForm from "./create-edit-form";

export const roomColumns: ColumnDef<Room>[] = [
  {
    accessorKey: "room_number",
    header: "Room Number",
  },
  {
    accessorKey: "room_type",
    header: "Room Type",
  },
  {
    accessorKey: "max_capacity",
    header: "Max Capacity",
    cell: ({ row }) => {
      const max_capacity = parseFloat(row.getValue("max_capacity"));

      return <span>{max_capacity} persons</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Price (per night)",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      return <span>{formatPriceToNaira(price)}</span>;
    },
  },
  {
    accessorKey: "discount_price",
    header: "Discount",
    cell: ({ row }) => {
      const discount = parseFloat(row.getValue("discount_price"));

      return (
        <>
          {discount == 0 ? (
            <Minus className="w-4 h-4" />
          ) : (
            <span className="text-green-500 font-space">
              +{formatPriceToNaira(discount)}
            </span>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return <Badge variant="default">{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const room = row.original;

      const [open, setOpen] = React.useState(false);

      return (
        // open={opens === "roomEdit"} onOpenChange={setIsOpen}
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem className="flex items-center gap-x-3 cursor-pointer">
                  <Edit className="w-4 h-4" />
                  Edit room
                </DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-x-3 cursor-pointer"
                // onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                <Trash2Icon className="w-4 h-4" />
                Delete room
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit room</DialogTitle>
            </DialogHeader>
            <CreateEditForm
              setOpen={(value) => setOpen(value)}
              roomToEdit={room}
            />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
