import { getBookings } from "@/services/bookingServices";
import { useQuery } from "@tanstack/react-query";

export default function useBookings() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  return { bookings, isLoading, error };
}
