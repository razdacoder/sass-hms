import { Button } from "@/components/ui/button";
import { Heading2 } from "@/components/ui/typography";
import RoomPage from "@/features/rooms/room-page";
import { Plus } from "lucide-react";

export default function Rooms() {
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading2>All rooms</Heading2>
        <div>
          <Button className="flex gap-x-3 font-medium items-center">
            <Plus className="w-4 h-4" />
            Add room
          </Button>
        </div>
      </div>
      <RoomPage />
    </>
  );
}
