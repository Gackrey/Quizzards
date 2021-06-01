import axios from "axios";

export const AuthApiLogin = async (username: string, password: string) => {
  const response = await axios.post(
    "https://quizzerd-backend.herokuapp.com/user/login",
    {
      username,
      password,
    }
  );
  return response;
};

export const AuthApiSignUp = async (username: string, email: string, password: string) => {
  const response = await axios.post(
    "https://quizzerd-backend.herokuapp.com/user/signup",
    {
      username,
      email,
      password,
    }
  );
  return response;
};
