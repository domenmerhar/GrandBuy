import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getProducts } from "../../api/getProducts";

interface useProductsInfiniteProps {
  queryName: string;
  query: string;
  from: number;
  to: number;
  freeShipping: boolean;
  sale: boolean;
  rating: number;
}

export const useProductsInfinite = ({
  queryName,
  query,
  from,
  to,
  freeShipping,
  sale,
  rating,
}: useProductsInfiniteProps) => {
  const { ref, inView } = useInView({ threshold: 0.5 });

  const { data, isLoading, error, fetchNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: [queryName, query, from, to, freeShipping, sale, rating],
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
        });
      },
      getNextPageParam: (lastPage) => lastPage?.nextItem || null,
      initialPageParam: 1,
    });

  useEffect(() => {
    if (inView && !isFetching) {
      console.log("fetching next page");
      fetchNextPage();
    }
  }, [ref, inView, fetchNextPage, isFetching]);

  return { data, isLoading, error, isFetching, ref };
};
