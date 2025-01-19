import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/product/getProduct";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";

export const useProduct = () => {
  const { productId } = useParams();
  const [{ JWT, userId }] = useAuthContext();
  const client = useQueryClient();

  if (!productId) throw new Error("No productId found in URL");

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId!, JWT),
  });

  useEffect(() => {
    if (data?.status === "success")
      client.invalidateQueries({ queryKey: ["history", userId] });
  }, [data?.status, client, userId]);

  return { data, isLoading, error };
};
