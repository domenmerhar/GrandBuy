import { FC, ReactNode } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
type UserRole = "admin" | "user" | "seller" | "";

interface RouteProtectorProps {
  allowedRoles: UserRole[];
  children?: ReactNode | ReactNode[];
}

export const RouteProtector: FC<RouteProtectorProps> = ({
  allowedRoles,
  children,
}) => {
  const [{ role }] = useAuthContext();

  return !allowedRoles.includes(role) ? (
    <Navigate to={"/"} replace relative="path" />
  ) : (
    children
  );
};
