import { getProducts } from "../../api/product/getProducts";
import { useProduct } from "./useProduct";
import { useInfinite } from "../../hooks/useInfinite";
import { ProductGrid } from "../../Util/ProductGrid";
import { InfiniteProducts } from "../../Components/InfiniteProducts";

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
    />
  );
};
