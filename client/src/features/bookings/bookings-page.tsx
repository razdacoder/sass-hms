import { DataTable } from "@/components/ui/data-table";
import Spinner from "@/components/ui/spinner";
import { Heading2 } from "@/components/ui/typography";
import { bookingsColumn } from "./booking-colums";
import useBookings from "./useBookings";

export default function BookingsPage() {
  const { bookings, isLoading } = useBookings();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading2>All bookings</Heading2>
        <span>Filter / Sort</span>
      </div>

      <DataTable columns={bookingsColumn} data={bookings} />
    </>
  );
}
