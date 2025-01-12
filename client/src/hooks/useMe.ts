import { getMe } from "../api/user/getMe";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../contexts/AuthContext";

export const useMe = () => {
  const [{ userId, JWT }] = useAuthContext();

  const { data, error, isLoading } = useQuery({
    queryKey: ["user-settings", userId],
    queryFn: () => getMe(JWT),
  });

  return { data, error, isLoading };
};
