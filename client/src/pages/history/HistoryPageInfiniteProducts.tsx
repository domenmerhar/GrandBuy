import { useInfinite } from "../../hooks/useInfinite";
import { useAuthContext } from "../../contexts/AuthContext";
import { getHistory } from "../../api/getHistory";
import { InfiniteProducts } from "../../Components/InfiniteProducts";
import { IProductShort } from "../../Util/types";
import { ProductCard } from "../../Util/ProductCard";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { ProductGrid } from "../../Util/ProductGrid";

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

  const renderFn = (page) =>
    page?.data?.historyItems?.map(
      ({ product }: { _id: string; product: IProductShort }) => {
        if (!product) return null;
        const { _id, name, coverImage, discount, totalPrice } = product;

        return (
          <ProductCard
            key={_id}
            id={_id}
            title={name}
            image={toApiFilesPath(coverImage)}
            discount={discount}
            price={totalPrice}
          />
        );
      }
    );

  return (
    <InfiniteProducts {...data} container={ProductGrid} renderFn={renderFn} />
  );
};
