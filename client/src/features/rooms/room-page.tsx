import Spinner from "@/components/ui/spinner";
import { DataTable } from "../../components/ui/data-table";
import { roomColumns } from "./room-colums";
import { useRooms } from "./useRooms";

export default function RoomPage() {
  const { isLoading, rooms } = useRooms();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="mt-4">
      <DataTable columns={roomColumns} data={rooms} />
    </div>
  );
}
