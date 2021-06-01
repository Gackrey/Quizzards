import { createContext, useContext, useState, useEffect } from "react";
import { AuthApiLogin, AuthApiSignUp } from './AuthHandler';
import { AuthenticationContextType } from './Context.type'
export const AuthContext = createContext({} as AuthenticationContextType);
export const AuthProvider: React.FC = ({ children }) => {
  const [isUserLogin, setLogin] = useState(false);
  useEffect(() => {
    const localUser = localStorage?.getItem("QuizAuth")
    if (localUser) {
      const loginStatus = JSON.parse(localUser);
      loginStatus.userID && setLogin(true);
    }
  }, []);

  async function loginUserWithCredentials(email: string, password: string) {
    try {
      const response = await AuthApiLogin(email, password);
      if (response.data.success) {
        setLogin(true);
        localStorage.setItem(
          "QuizAuth",
          JSON.stringify({ userID: response.data.id })
        );
        return { success: response.data.success };
      }
    } catch (error) {

      console.log("Sahi username password nahi pata kya?", error);
      return { success: false };
    }
  }

  async function signinUser(username: string, email: string, password: string) {
    try {
      const response = await AuthApiSignUp(username, email, password);
      if (response.data.success) {
        setLogin(true);
        localStorage.setItem(
          "QuizAuth",
          JSON.stringify({ userID: response.data.id })
        );
        return { success: response.data.success };
      }
    } catch (error) {
      console.log("Sahi username password nahi pata kya?", error);
      return { success: false };
    }
  }
  function LogOut() {
    setLogin(false);
    localStorage.removeItem("QuizAuth");
  }
  return (
    <AuthContext.Provider
      value={{
        isUserLogin,
        loginUserWithCredentials,
        signinUser,
        LogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
