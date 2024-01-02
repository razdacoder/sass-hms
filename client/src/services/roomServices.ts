import api from "./apiServices";

export const getRooms = async () => {
  const response = await api.get("rooms/");
  return response.data;
};
