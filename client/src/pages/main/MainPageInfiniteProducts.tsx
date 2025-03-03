import { getProducts } from "../../api/product/getProducts";
import { InfiniteProducts } from "../../Components/InfiniteProducts";
import { useInfinite } from "../../hooks/useInfinite";
import { ProductGrid } from "../../Util/ProductGrid";
import { renderProduct } from "../../Util/renderProduct";

/**
 * Komponenta za prikaz neskončnih izdelkov na glavni strani.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja neskončne izdelke na glavni strani.
 *
 * @example
 * // Uporaba komponente
 * <MainPageInfiniteProducts />
 */

const queryFn = ({ pageParam }: unknown) => {
  if (pageParam === null) return;

  return getProducts({
    query: "",
    page: Number(pageParam),
    sort: "-orders",
  });
};

export const MainPageInfiniteProducts = () => {
  const data = useInfinite({
    queryKey: ["main-page-infinite-products"],
    queryFn,
  });

  return (
    <InfiniteProducts
      {...data}
      container={ProductGrid}
      renderFn={renderProduct}
    />
  );
};
