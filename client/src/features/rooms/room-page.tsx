import { DataTable } from "../../components/ui/data-table";
import { roomColumns } from "./room-colums";

export default function RoomPage() {
  const data = [
    {
      id: "4a64eba0-0baf-4cf9-8496-51a0eec02739",
      hotel: "091ad459-8ec0-4876-8ebc-ed214cc608a8",
      room_number: "001",
      room_type: "EDP",
      max_capacity: 2,
      price: 45000.0,
      discount_price: 35000.0,
      status: "available",
      created_at: new Date("2023-12-31T11:47:28.779130Z"),
    },
  ];
  return (
    <div className="mt-4">
      <DataTable columns={roomColumns} data={data} />
    </div>
  );
}
