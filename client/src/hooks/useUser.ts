import { getUser } from "../api/getUser";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

export const useUser = () => {
  const { userId } = useParams();
  const { pathname } = useLocation();
  const role = pathname.includes("user") ? "user" : "seller";

  const { data, error, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId!, role),
  });

  return { data, error, isLoading };
};
