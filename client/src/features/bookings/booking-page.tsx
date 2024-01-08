import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Heading3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingDataBox from "./BookingDataBox";
import useBooking from "./useBooking";

export default function BookingPage() {
  const { booking, status } = useBooking();
  const navigate = useNavigate();

  if (status === "pending") {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading3 className="flex flex-col gap-y-2">
          Booking #{booking.id}
          <Badge
            className={cn(
              "uppercase flex justify-center items-center",
              booking.booking_status === "checked-in" &&
                "bg-green-500 hover:bg-green-500"
            )}
          >
            {booking.booking_status}
          </Badge>
        </Heading3>
        <Button
          onClick={() => navigate("/bookings")}
          className="flex items-center gap-x-3"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
      </div>
      <BookingDataBox booking={booking} />
    </div>
  );
}
