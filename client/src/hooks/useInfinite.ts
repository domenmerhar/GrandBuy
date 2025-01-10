import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface useInfiniteProps {
  queryKey: unknown[];
  queryFn: ({ pageParam }: { pageParam: unknown }) => unknown;
}

export const useInfinite = ({ queryKey, queryFn }: useInfiniteProps) => {
  const { ref, inView } = useInView({ threshold: 0.5 });

  const { data, isLoading, error, fetchNextPage, isFetching } =
    useInfiniteQuery({
      queryKey,
      queryFn,
      getNextPageParam: (lastPage) => lastPage?.nextItem || null,
      initialPageParam: 1,
    });

  useEffect(() => {
    if (inView && !isFetching && !error) {
      fetchNextPage();
    }
  }, [ref, inView, fetchNextPage, isFetching, error]);

  return { data, isLoading, error, isFetching, ref };
};
