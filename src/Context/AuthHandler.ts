import axios from "axios";
import { API_URL } from "../Constants";

export const AuthApiLogin = async (username: string, password: string) => {
  const response = await axios.post(
    `${API_URL}/user/login`,
    {
      username,
      password,
    }
  );
  return response;
};

export const AuthApiSignUp = async (username: string, email: string, password: string) => {
  const response = await axios.post(
    `${API_URL}/user/signup`,
    {
      username,
      email,
      password,
    }
  );
  return response;
};
