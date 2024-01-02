import { getRooms } from "@/services/roomServices";
import { useQuery } from "@tanstack/react-query";

export function useRooms() {
  const {
    isLoading,
    data: rooms,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  return { isLoading, error, rooms };
}
