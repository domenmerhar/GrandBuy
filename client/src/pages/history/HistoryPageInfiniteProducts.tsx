import { useInfinite } from "../../hooks/useInfinite";
import { useAuthContext } from "../../contexts/AuthContext";
import { getHistory } from "../../api/getHistory";
import { InfiniteProducts } from "../../Components/InfiniteProducts";

const queryFn =
  (JWT: string) =>
  ({ pageParam }) => {
    if (pageParam === null) return;

    return getHistory({ JWT, page: pageParam });
  };

export const HistoryPageInfiniteProducts = () => {
  const [{ userId, JWT }] = useAuthContext();

  const data = useInfinite({
    queryKey: ["history", userId],
    queryFn: queryFn(JWT),
  });

  return <InfiniteProducts {...data} />;
};
