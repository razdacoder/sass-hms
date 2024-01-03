import api from "./apiServices";

export const getRooms = async () => {
  const response = await api.get("rooms/");
  return response.data;
};

export const createRoom = async (data: {
  room_number: string;
  room_type: string;
  max_capacity: number;
  price: number;
  discount_price: number;
}) => {
  const response = await api.post("rooms/", data);
  if (response.status != 201) {
    throw new Error("Room could not be created");
  }

  return response.data;
};
