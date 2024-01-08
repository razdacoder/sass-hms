import { getBooking } from "@/services/bookingServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useBooking() {
  const { bookingId } = useParams();
  const { data: booking, status } = useQuery({
    queryKey: ["booking", parseInt(bookingId as string)],
    queryFn: () => getBooking(parseInt(bookingId as string)),
  });
  return { booking, status };
}
