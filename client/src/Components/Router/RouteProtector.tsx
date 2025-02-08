import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
type UserRole = "admin" | "user" | "seller" | "";

interface RouteProtectorProps {
  allowedRoles: UserRole[];
  children?: ReactNode | ReactNode[];
}

export const RouteProtector: FC<RouteProtectorProps> = ({
  allowedRoles,
  children,
}) => {
  const { data } = useMe();

  const role = data?.data?.role;

  return !allowedRoles.includes(role) ? (
    <Navigate to={"/"} replace relative="path" />
  ) : (
    children
  );
};
