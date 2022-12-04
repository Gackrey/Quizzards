import { Route, Navigate } from "react-router-dom";

export function PrivateRoute({ path, ...props }: any) {
  const localData = localStorage?.getItem("QuizAuth")
  let isUserLogin = false;
  if (localData) {
    isUserLogin = true
  }
  return isUserLogin ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate replace to="/login" />
  );
}