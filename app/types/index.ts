export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  available: boolean;
  costumer_email: string;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  img?: string;
  role: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User | null;
  error?: string;
}
