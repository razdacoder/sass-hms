type Guest = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
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
