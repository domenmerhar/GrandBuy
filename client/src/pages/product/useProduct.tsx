import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/getProduct";

export const useProduct = () => {
  const { productId } = useParams();

  if (!productId) throw new Error("No productId found in URL");

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId!),
  });

  return { data, isLoading, error };
};
