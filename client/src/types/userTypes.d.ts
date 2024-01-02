type Hotel = {
  id: string;
  name: string;
  logo: string | null;
  address: string;
  phone_number: string;
  created_at: Date;
  updated_at: Date;
};

type User = {
  id: string;
  name: string;
  role: string;
  email: string;
  hotel: Hotel;
};
