export interface User {
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  role: string;
}