import { updateRoom } from "@/services/roomServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditRoom() {
  const queryClient = useQueryClient();
  const { mutate: editRoom, status: isEditing } = useMutation({
    mutationFn: (data: Room) => updateRoom(data),
    onSuccess: () => {
      toast.success("Room updated successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editRoom, isEditing };
}
