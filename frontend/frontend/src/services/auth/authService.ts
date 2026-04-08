import axiosInstance from "../../config/axiosInstance";

export const loginApi = (data: {
  email: string;
  password: string;
}) => {
  return axiosInstance.post("/auth/login", data);
};