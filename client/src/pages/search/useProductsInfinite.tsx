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

/**
 * Hook za upravljanje neskončnega nalaganja izdelkov.
 *
 * @param {Object} props - Lastnosti hooka.
 * @param {string} props.queryName - Ime poizvedbe.
 * @param {string} props.query - Iskalni poizved.
 * @param {number} props.from - Minimalna cena izdelkov.
 * @param {number} props.to - Maksimalna cena izdelkov.
 * @param {boolean} props.freeShipping - Ali izdelek vključuje brezplačno pošiljanje.
 * @param {boolean} props.sale - Ali je izdelek v akciji.
 * @param {number} props.rating - Ocena izdelka.
 * @param {string} props.sort - Način razvrščanja izdelkov.
 * @returns {Object} Objekt, ki vsebuje podatke o izdelkih, stanje nalaganja, morebitne napake, funkcijo za nalaganje naslednje strani in referenco za sledenje vidljivosti.
 *
 * @example
 * // Uporaba hooka
 * const { data, isLoading, error, isFetching, ref } = useProductsInfinite({
 *   queryName: "products",
 *   query: "laptop",
 *   from: 0,
 *   to: 1000,
 *   freeShipping: true,
 *   sale: false,
 *   rating: 4,
 *   sort: "-orders",
 * });
 */

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
