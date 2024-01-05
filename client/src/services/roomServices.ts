import api from "./apiServices";

export const getRooms = async () => {
  const response = await api.get("rooms/");
  return response.data;
};

export const getRoomsTypes = async () => {
  const response = await api.get("rooms/get_types/");
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

export const updateRoom = async (data: Room) => {
  const response = await api.put(`rooms/${data.id}/`, data);
  if (response.status != 200) {
    throw new Error("Room could not be updated");
  }

  return response.data;
};

export const deleteRoom = async (id: string) => {
  const response = await api.delete(`rooms/${id}/`);
  if (response.status != 204) {
    throw new Error("Could not delete room");
  }

  return response.data;
};
