import { deleteBooking } from "@/services/bookingServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteBookingFn, status: deleting } = useMutation({
    mutationFn: (id: number) => deleteBooking(id),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteBookingFn, deleting };
}
