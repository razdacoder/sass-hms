type Guest = {
  id: string;
  fullName: string;
  email: string;
};

type Booking = {
  id: number;
  check_in_date: Date;
  check_out_date: Date;
  guest: Guest;
  room: Room;
  number_of_guests: number;
  special_requests: string;
  total_cost: number;
  isPaid: boolean;
  booking_status: string;
  created_at: Date;
  updated_at: Date;
};

type CreateBooking = {
  room_type: string;
  number_of_guests: number;
  check_in_date: string;
  check_out_date: string;
  booking_status: string;
  special_requests: string;
  isPaid: boolean;
  guest: {
    email: string;
    fullName: string;
  };
};
