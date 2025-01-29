import { useQuery } from "@tanstack/react-query";
import { getNotificationCount } from "../../api/notification/getNotificationCount";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";

export const useNotficationCount = () => {
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;

  return useQuery({
    queryKey: ["notificationCount", userId],
    queryFn: () => getNotificationCount(JWT),
  });
};
