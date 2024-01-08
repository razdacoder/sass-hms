import { checkout } from "@/services/bookingServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCheckOut() {
  const queryClient = useQueryClient();
  const { status: checkingout, mutateAsync: checkoutFn } = useMutation({
    mutationFn: (data: { id: number; isPaid: boolean }) => checkout(data),
    onSuccess: (data) => {
      toast.success("Checkout successfull");
      queryClient.invalidateQueries({ queryKey: ["booking", data.id] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { checkingout, checkoutFn };
}
