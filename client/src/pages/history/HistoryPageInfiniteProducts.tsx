import { useInfinite } from "../../hooks/useInfinite";
import { useAuthContext } from "../../contexts/AuthContext";
import { getHistory } from "../../api/getHistory";
import { InfiniteProducts } from "../../Components/InfiniteProducts";
import { HistoryItem, HistoryResponse } from "../../Util/types";
import { ProductCard } from "../../Components/Card/ProductCard";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { ProductGrid } from "../../Util/ProductGrid";
import { useMe } from "../../hooks/useMe";

const queryFn =
  (JWT: string) =>
  ({ pageParam }) => {
    if (pageParam === null) return;

    return getHistory({ JWT, page: pageParam });
  };

/**
 * Komponenta za prikaz izdelkov na strani zgodovine.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja izdelke na strani zgodovine.
 *
 * @example
 * // Uporaba komponente
 * <HistoryPageInfiniteProducts />
 */

export const HistoryPageInfiniteProducts = () => {
  const { JWT } = useAuthContext();
  const { data: dataUser } = useMe();

  const userId = dataUser?.data?._id;

  const data = useInfinite({
    queryKey: ["history", userId],
    queryFn: queryFn(JWT),
  });

  const renderFn = (page: HistoryResponse) =>
    page?.data?.historyItems?.map(
      ({ product, name, coverImage, discount, totalPrice }: HistoryItem) => {
        return (
          <ProductCard
            key={product}
            id={product}
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
