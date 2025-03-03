import { getUser } from "../api/user/getUser";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

/**
 * useUser hook za pridobivanje podatkov o uporabniku glede na ID.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje podatke o uporabniku.
 *
 * @example
 * // Uporaba hook-a
 * const { data: user, isLoading, isError } = useUser();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return <div>{user?.data.username}</div>;
 */

export const useUser = () => {
  const { userId } = useParams();
  const { pathname } = useLocation();
  const role = pathname.includes("user") ? "user" : "seller";

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId!, role),
  });
};
