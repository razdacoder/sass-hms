import { updateBooking } from "@/services/bookingServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditBooking() {
  const queryClient = useQueryClient();
  const { mutate: updateBookingFn, status: editing } = useMutation({
    mutationFn: (data: { booking: CreateBooking; id: number }) =>
      updateBooking(data),
    onSuccess: () => {
      toast.success("Booking updated successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateBookingFn, editing };
}
