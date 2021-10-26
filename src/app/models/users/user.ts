export interface User {
  id: number;
  email: string;
  username: string;
  name: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
