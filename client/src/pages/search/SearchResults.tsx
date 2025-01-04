import { useParams, useSearchParams } from "react-router-dom";
import { useProductsInfinite } from "./useProductsInfinite";
import { InfiniteProducts } from "../../Components/InfiniteProducts";

export const SearchResults = () => {
  const { query } = useParams();
  const [searchParams] = useSearchParams();

  const [from, to, freeShipping, sale, rating] = [
    Number(searchParams.get("from")),
    Number(searchParams.get("to")),
    searchParams.get("free-shipping") === "true",
    searchParams.get("sale") === "true",
    Number(searchParams.get("rating")),
  ];

  const { data, isLoading, isFetching, error, ref } = useProductsInfinite({
    queryName: "products-search",
    query: String(query),
    from,
    to,
    freeShipping,
    sale,
    rating,
  });

  return (
    <InfiniteProducts
      data={data}
      error={error}
      isFetching={isFetching}
      isLoading={isLoading}
      ref={ref}
    />
  );
};
