import { useQuery } from "@tanstack/react-query";
import { getNotificationCount } from "../../api/notification/getNotificationCount";
import { useAuthContext } from "../../contexts/AuthContext";

export const useNotficationCount = () => {
  const [{ JWT, userId }] = useAuthContext();

  return useQuery({
    queryKey: ["notificationCount", userId],
    queryFn: () => getNotificationCount(JWT),
  });
};
