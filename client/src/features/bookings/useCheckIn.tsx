import { checkIn } from "@/services/bookingServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCheckIn() {
  const queryClient = useQueryClient();
  const { mutateAsync: checkInFn, status: checkingin } = useMutation({
    mutationFn: (data: { id: number; isPaid: boolean }) => checkIn(data),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Guest checked in successfully");
      queryClient.invalidateQueries({ queryKey: ["booking", data.id] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { checkInFn, checkingin };
}
