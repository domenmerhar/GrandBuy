import { getMe } from "../api/user/getMe";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../contexts/AuthContext";

export const useMe = () => {
  const { JWT, clearAuthInfo } = useAuthContext();

  const queryData = useQuery({
    queryKey: ["user-settings", JWT],
    queryFn: () => getMe(JWT),
  });

  if (queryData?.data?.status === "error") clearAuthInfo();

  return queryData;
};
