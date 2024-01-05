import { Badge } from "@/components/ui/badge";
import { cn, formatDate, formatPriceToNaira } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, MoreVertical, Trash } from "lucide-react";

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
import { useState } from "react";
import CreateEditBookingForm from "./create-edit-booking-form";

export const bookingsColumn: ColumnDef<Booking>[] = [
  {
    accessorKey: "guest",
    header: "Guest",
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <div className="font-semibold uppercase flex flex-col gap-y-1">
          {booking.guest.fullName}
          <span className="text-muted text-sm lowercase">
            {booking.guest.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "room",
    header: "Room",
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <div className="font-semibold uppercase">
          {booking.room.room_type} {booking.room.room_number}
        </div>
      );
    },
  },
  {
    accessorKey: "check_in_date",
    header: "Check in Date",
    cell: ({ row }) => {
      const checkInDate = row.getValue("check_in_date") as string;

      return <span className="text-semibold ">{formatDate(checkInDate)}</span>;
    },
  },
  {
    accessorKey: "check_out_date",
    header: "Check out Date",
    cell: ({ row }) => {
      const checkInDate = row.getValue("check_out_date") as string;

      return <span className="text-semibold ">{formatDate(checkInDate)}</span>;
    },
  },
  {
    accessorKey: "number_of_guests",
    header: "No of Guests",
    cell: ({ row }) => {
      const numGuests = parseInt(row.getValue("number_of_guests"));

      return <span className="text-semibold">+{numGuests - 1} guests</span>;
    },
  },
  {
    accessorKey: "total_cost",
    header: "Total Cost",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_cost"));

      return (
        <div className="font-semibold uppercase text-green-500 font-space">
          {formatPriceToNaira(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "booking_status",
    header: "status",
    cell: ({ row }) => {
      const status = row.getValue("booking_status");

      return (
        <Badge
          className={cn(
            "font-semibold uppercase",
            status === "checked-in" && "bg-green-500"
          )}
        >
          {status as string}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const booking = row.original;

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex gap-x-2 items-center cursor-pointer">
                <Eye className="w-4 h-4" />
                <span>View Booking</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem className="flex gap-x-2 items-center cursor-pointer">
                  <Edit className="w-4 h-4" />
                  <span>Edit Booking</span>
                </DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-x-2 items-center cursor-pointer">
                <Trash className="w-4 h-4" />
                <span>Delete Booking</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit booking</DialogTitle>
            </DialogHeader>
            <CreateEditBookingForm
              bookingToEdit={booking}
              setOpen={(value) => setOpen(value)}
            />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
