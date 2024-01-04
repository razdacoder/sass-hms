import api from "./apiServices";

export const getBookings = async () => {
  const response = await api.get("bookings");
  if (response.status != 200) {
    throw new Error("Could not get bookings");
  }
  return response.data;
};
