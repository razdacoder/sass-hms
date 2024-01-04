import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Spinner from "@/components/ui/spinner";
import { Heading2 } from "@/components/ui/typography";
import { Plus } from "lucide-react";
import { useState } from "react";
import { bookingsColumn } from "./booking-colums";
import CreateEditBookingForm from "./create-edit-booking-form";
import useBookings from "./useBookings";

export default function BookingsPage() {
  const { bookings, isLoading } = useBookings();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading2>All bookings</Heading2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex gap-x-3 font-medium items-center">
              <Plus className="w-4 h-4" />
              Create new booking
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create new booking</DialogTitle>
            </DialogHeader>
            <CreateEditBookingForm />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={bookingsColumn} data={bookings} />
    </>
  );
}
