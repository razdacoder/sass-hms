import { createRoom } from "@/services/roomServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreateRoom() {
  const queryClient = useQueryClient();
  const { mutate: createNewRoom, status } = useMutation({
    mutationFn: (data: {
      room_number: string;
      room_type: string;
      max_capacity: number;
      price: number;
      discount_price: number;
    }) => createRoom(data),
    onSuccess: () => {
      toast.success("New room successfully created");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createNewRoom, status };
}
