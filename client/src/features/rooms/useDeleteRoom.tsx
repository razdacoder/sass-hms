import { deleteRoom } from "@/services/roomServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteRoom() {
  const queryClient = useQueryClient();
  const { mutate: deleteRoomFn, status } = useMutation({
    mutationFn: (id: string) => deleteRoom(id),
    onSuccess: () => {
      toast.success("Room deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteRoomFn, status };
}
