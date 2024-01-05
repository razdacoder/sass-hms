import { createBooking } from "@/services/bookingServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreateBooking() {
  const queryClient = useQueryClient();
  const { mutate: createBookingFn, status: creating } = useMutation({
    mutationFn: (data: CreateBooking) => createBooking(data),
    onSuccess: () => {
      toast.success("Booking created successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createBookingFn, creating };
}
