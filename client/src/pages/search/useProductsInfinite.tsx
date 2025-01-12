import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getProducts } from "../../api/product/getProducts";

interface useProductsInfiniteProps {
  queryName: string;
  query: string;
  from: number;
  to: number;
  freeShipping: boolean;
  sale: boolean;
  rating: number;
  sort: string;
}

export const useProductsInfinite = ({
  queryName,
  query,
  from,
  to,
  freeShipping,
  sale,
  rating,
  sort,
}: useProductsInfiniteProps) => {
  const { ref, inView } = useInView({ threshold: 0.5 });

  const { data, isLoading, error, fetchNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: [queryName, query, from, to, freeShipping, sale, rating, sort],
      queryFn: ({ pageParam }) => {
        if (pageParam === null) return;

        return getProducts({
          query: query,
          page: Number(pageParam),
          from,
          to,
          freeShipping,
          sale,
          rating,
          sort,
        });
      },
      getNextPageParam: (lastPage) => lastPage?.nextItem || null,
      initialPageParam: 1,
    });

  useEffect(() => {
    if (inView && !isFetching) {
      fetchNextPage();
    }
  }, [ref, inView, fetchNextPage, isFetching]);

  return { data, isLoading, error, isFetching, ref };
};
