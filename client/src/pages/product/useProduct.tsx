import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/product/getProduct";
import { useAuthContext } from "../../contexts/AuthContext";

export const useProduct = () => {
  const { productId } = useParams();
  const [{ JWT }] = useAuthContext();

  if (!productId) throw new Error("No productId found in URL");

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId!, JWT),
  });

  return { data, isLoading, error };
};
