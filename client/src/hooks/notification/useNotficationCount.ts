import { useQuery } from "@tanstack/react-query";
import { getNotificationCount } from "../../api/notification/getNotificationCount";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";

/**
 * useNotficationCount hook za pridobivanje števila neprebranih obvestil.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje število neprebranih obvestil.
 *
 * @example
 * // Uporaba hook-a
 * const { data: count, isLoading, isError } = useNotficationCount();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return <div>Število neprebranih obvestil: {count?.data.count}</div>;
 */

export const useNotficationCount = () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["notificationCount", userId],
    queryFn: () => getNotificationCount(JWT),
  });
};
