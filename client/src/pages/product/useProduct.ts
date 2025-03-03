import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/product/getProduct";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useMe } from "../../hooks/useMe";

/**
 * Hook za pridobivanje podatkov o izdelku.
 *
 * @returns {Object} Objekt, ki vsebuje podatke o izdelku, stanje nalaganja in morebitne napake.
 *
 * @example
 * // Uporaba hook
 * const { data, isLoading, error } = useProduct();
 */

export const useProduct = () => {
  const { productId } = useParams();
  const { JWT } = useAuthContext();
  const { data: dataUser } = useMe();
  const client = useQueryClient();

  const userId = dataUser?.data?._id;

  if (!productId) throw new Error("No productId found in URL");

  const queryData = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId!, JWT),
  });

  useEffect(() => {
    if (queryData?.data?.status === "success")
      client.invalidateQueries({ queryKey: ["history", userId] });
  }, [queryData?.data?.status, client, userId]);

  return queryData;
};
