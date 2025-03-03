import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
type UserRole = "admin" | "user" | "seller" | "";

interface RouteProtectorProps {
  allowedRoles: UserRole[];
  children?: ReactNode | ReactNode[];
}

/**
 * RouteProtector komponenta za zaščito poti na podlagi uporabniške vloge.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {UserRole[]} props.allowedRoles - Niz dovoljenih uporabniških vlog.
 * @param {ReactNode | ReactNode[]} [props.children] - Vsebina, ki se prikaže, če je uporabnik dovoljen.
 * @returns {JSX.Element} - JSX element zaščitene poti.
 *
 * @example
 * // Uporaba komponente
 * <RouteProtector allowedRoles={["admin", "user"]}>
 * <Dashboard />
 * </RouteProtector>
 */

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
