import { useParams, useSearchParams } from "react-router-dom";
import { InfiniteProducts } from "../../Components/InfiniteProducts";
import { useInfinite } from "../../hooks/useInfinite";
import { getProducts } from "../../api/product/getProducts";
import { ProductGrid } from "../../Util/ProductGrid";
import { renderProduct } from "../../Util/renderProduct";

/**
 * Komponenta za prikaz rezultatov iskanja izdelkov.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja rezultate iskanja izdelkov.
 *
 * @example
 * // Uporaba komponente
 * <SearchResults />
 */

export const SearchResults = () => {
  const { query } = useParams();
  const [searchParams] = useSearchParams();

  const [from, to, freeShipping, sale, rating, sort] = [
    Number(searchParams.get("from")),
    Number(searchParams.get("to")),
    searchParams.get("free-shipping") === "true",
    searchParams.get("sale") === "true",
    Number(searchParams.get("rating")),
    searchParams.get("sort") || "-orders",
  ];

  const queryFn = ({ pageParam }) => {
    if (pageParam === null) return;

    return getProducts({
      query: query || "",
      from,
      to,
      freeShipping,
      page: pageParam,
      rating,
      sale,
      sort,
    });
  };

  const { data, error, isFetching, isLoading, ref } = useInfinite({
    queryFn,
    queryKey: [
      "products-search",
      query,
      from,
      to,
      freeShipping,
      sale,
      rating,
      sort,
    ],
  });

  return (
    <InfiniteProducts
      data={data}
      error={error}
      isFetching={isFetching}
      isLoading={isLoading}
      ref={ref}
      container={ProductGrid}
      renderFn={renderProduct}
    />
  );
};
