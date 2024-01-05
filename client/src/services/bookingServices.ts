import api from "./apiServices";

export const getBookings = async () => {
  const response = await api.get("bookings/");
  if (response.status != 200) {
    throw new Error("Could not get bookings");
  }
  return response.data;
};

export const createBooking = async (booking: CreateBooking) => {
  const response = await api.post("bookings/", booking);
  if (response.status != 201) {
    throw new Error("Could not create booking");
  }
  return response.data;
};

export const updateBooking = async ({
  booking,
  id,
}: {
  booking: CreateBooking;
  id: number;
}) => {
  const response = await api.put(`bookings/${id}/`, booking);
  if (response.status != 200) {
    throw new Error("Could not update booking");
  }

  return response.data;
};
