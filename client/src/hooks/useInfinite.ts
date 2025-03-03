import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface useInfiniteProps {
  queryKey: unknown[];
  queryFn: ({ pageParam }: { pageParam: unknown }) => unknown;
}

/**
 * useInfinite hook za neskončno pridobivanje podatkov s pomočjo `react-query` in `react-intersection-observer`.
 *
 * @param {useInfiniteProps} props - Objekt, ki vsebuje `queryKey` in `queryFn` za `react-query`.
 * @returns {object} - Objekt, ki vsebuje `data`, `isLoading`, `error`, `isFetching` in `ref` za opazovanje elementa.
 *
 * @example
 * // Uporaba hook-a
 * const { data, isLoading, error, isFetching, ref } = useInfinite({
 * queryKey: ["products"],
 * queryFn: ({ pageParam }) => getProducts({ page: pageParam }),
 * });
 *
 * return (
 * <div>
 * {data?.pages.map(page => (
 * page.items.map(item => (
 * <div key={item._id}>{item.name}</div>
 * ))
 * ))}
 * <div ref={ref}>
 * {isFetching && <p>Loading more...</p>}
 * </div>
 * </div>
 * );
 */

export const useInfinite = ({ queryKey, queryFn }: useInfiniteProps) => {
  const { ref, inView } = useInView({ threshold: 0.5 });

  const { data, isLoading, error, fetchNextPage, isFetching } =
    useInfiniteQuery({
      queryKey,
      queryFn,
      getNextPageParam: (lastPage) =>
        (lastPage as { nextItem?: number }).nextItem || null,
      initialPageParam: 1,
    });

  useEffect(() => {
    if (inView && !isFetching && !error) {
      fetchNextPage();
    }
  }, [ref, inView, fetchNextPage, isFetching, error]);

  return { data, isLoading, error, isFetching, ref };
};
