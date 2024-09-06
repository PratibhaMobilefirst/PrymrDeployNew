import { Navigate, Outlet } from "react-router";

export function PrivateRoute() {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

const baseURL = "https://prymr-dev-backend.vercel.app/api";

export { baseURL };

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
