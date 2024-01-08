import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Spinner from "@/components/ui/spinner";
import {
  Heading3,
  Heading4,
  Large,
  Paragraph,
} from "@/components/ui/typography";
import { formatPriceToNaira } from "@/lib/utils";
import { format } from "date-fns";
import { LucideHome, Minus } from "lucide-react";
import { useState } from "react";
import { redirect } from "react-router-dom";
import useCheckIn from "./useCheckIn";
import useCheckOut from "./useCheckOut";
import useDeleteBooking from "./useDeleteBooking";

type BookngDataBoxProps = {
  booking: Booking;
};

export default function BookingDataBox({ booking }: BookngDataBoxProps) {
  const [isPaid, setIsPaid] = useState(booking.isPaid);
  const { checkInFn, checkingin } = useCheckIn();
  const { checkingout, checkoutFn } = useCheckOut();
  const { deleteBookingFn, deleting } = useDeleteBooking();

  async function onCheckout() {
    await checkoutFn({ id: booking.id, isPaid });
  }
  async function onDelete() {
    await deleteBookingFn(booking.id);
    redirect("/bookings");
  }
  return (
    <section className=" border-1 rounded-md overflow-hidden mt-4">
      <header className="bg-primary px-4 py-4 font-medium flex items-center justify-between">
        <div className="flex items-center gap-6 font-semibold">
          <LucideHome className="w-4 h-4" />
          <Heading4>
            {booking.room.room_type} {booking.room.room_number}
          </Heading4>
        </div>
        <Paragraph className="flex gap-x-3 items-center">
          {format(new Date(booking.check_in_date), "EEE, MMM dd yyyy")}
          <Minus />
          {format(new Date(booking.check_out_date), "EEE, MMM dd yyyy")}
        </Paragraph>
      </header>
      <section className=" bg-white/10 px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <Large className="text-sm text-muted-foreground">GUEST</Large>
            <Heading4 className="uppercase">{booking.guest.fullName}</Heading4>
            <Paragraph>{booking.guest.email}</Paragraph>
          </div>
          <div>
            <Large className="">+{booking.number_of_guests - 1} Guests</Large>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Heading3 className="font-space text-green-500">
            {formatPriceToNaira(booking.total_cost)}
          </Heading3>
        </div>
        <div className=" mt-4">
          <Large className="text-sm text-muted-foreground">
            SPECIAL REQUESTS
          </Large>
          <Paragraph>{booking.special_requests}</Paragraph>
        </div>
      </section>
      <section className="p-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            onCheckedChange={() => setIsPaid((prev) => !prev)}
            checked={isPaid}
            disabled={isPaid}
            id="paid"
          />
          <label
            htmlFor="paid"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Paid
          </label>
        </div>
      </section>
      <footer className="px-4 py-4 bg-secondary flex gap-x-3">
        {booking.booking_status === "unconfirmed" && (
          <Button
            size="lg"
            onClick={() => checkInFn({ id: booking.id, isPaid })}
          >
            {checkingin === "pending" ? <Spinner /> : "Check in"}
          </Button>
        )}
        {booking.booking_status === "checked-in" && (
          <Button onClick={onCheckout} size="lg">
            {checkingout === "pending" ? <Spinner /> : "Check out"}
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="lg">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                booking and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>
                {deleting === "pending" ? <Spinner /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </footer>
    </section>
  );
}
