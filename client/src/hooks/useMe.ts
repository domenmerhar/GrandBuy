import { getMe } from "../api/user/getMe";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../contexts/AuthContext";

export const useMe = () => {
  const { JWT, clearAuthInfo } = useAuthContext();

  const { data, error, isLoading } = useQuery({
    queryKey: ["user-settings", JWT],
    queryFn: () => getMe(JWT),
  });

  if (data?.status === "error") clearAuthInfo();

  return { data, error, isLoading };
};
