import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMe } from "../useMe";
import { getSellerRefunds } from "../../api/refund/getSellerRefunds";
import { useSearchParams } from "react-router-dom";
import { RefundStatus } from "../../Util/types";

/**
 * useGetSellerRefunds hook za pridobivanje zahtevkov za vračilo prodajalca.
 *
 * @returns {object} - Vrne rezultat `useQuery` hook-a, ki vsebuje zahtevke za vračilo prodajalca.
 *
 * @example
 * // Uporaba hook-a
 * const { data: refunds, isLoading, isError } = useGetSellerRefunds();
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error...</p>;
 * return (
 * <div>
 * {refunds?.data.items.map(refund => (
 * <div key={refund._id}>{refund._id}</div>
 * ))}
 * </div>
 * );
 */

export default function useGetSellerRefunds() {
  const [searchParams] = useSearchParams();
  const { JWT } = useAuthContext();
  const { data } = useMe();

  const userId = data?.data?._id;
  const page = Number(searchParams.get("page")) || 1;
  const status =
    searchParams.get("filter") === "all"
      ? undefined
      : (searchParams.get("filter") as RefundStatus);

  const sort =
    searchParams.get("sort") === "oldest" ? "+createdAt" : "-createdAt";

  return useQuery({
    queryKey: ["seller-refunds", userId, page, status, sort],
    queryFn: () => getSellerRefunds({ JWT, page, status, sort }),
  });
}
