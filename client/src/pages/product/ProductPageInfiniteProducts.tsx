import { getProducts } from "../../api/product/getProducts";
import { useProduct } from "./useProduct";
import { useInfinite } from "../../hooks/useInfinite";
import { ProductGrid } from "../../Util/ProductGrid";
import { InfiniteProducts } from "../../Components/InfiniteProducts";
import { renderProduct } from "../../Util/renderProduct";

const queryFn =
  (to: number) =>
  ({ pageParam }) => {
    if (pageParam === null) return;

    return getProducts({
      query: "",
      page: Number(pageParam),
      to,
    });
  };

/**
 * Komponenta za prikaz neskončnih izdelkov na strani izdelka.
 *
 * @component
 * @returns {JSX.Element} JSX element, ki predstavlja neskončne izdelke na strani izdelka.
 *
 * @example
 * // Uporaba komponente
 * <ProductPageInfiniteProducts />
 */

export const ProductPageInfiniteProducts = () => {
  const { data } = useProduct();

  const {
    data: products,
    error,
    isFetching,
    isLoading,
    ref,
  } = useInfinite({
    queryKey: ["products-recommended", data?.data?.product?._id],
    queryFn: queryFn(
      data?.data?.products?.price + data?.data?.products?.shipping
    ),
  });

  return (
    <InfiniteProducts
      data={products}
      error={error}
      isFetching={isFetching}
      isLoading={isLoading}
      ref={ref}
      container={ProductGrid}
      renderFn={renderProduct}
    />
  );
};
