import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
type UserRole = "admin" | "user" | "seller" | "";

interface RouteProtectorProps {
  allowedRoles: UserRole[];
}

export const RouteProtector: FC<RouteProtectorProps> = ({ allowedRoles }) => {
  const navigate = useNavigate();
  const [{ role }] = useAuthContext();

  if (!allowedRoles.includes(role)) navigate("/", { replace: true });

  return <Outlet />;
};
