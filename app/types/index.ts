export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  available: boolean;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User | null;
  error?: string;
}
