import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProduct } from "../../api/product/addProduct";

export const useAddProduct = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: addProduct,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error("Failed to create product", { id: "add-product" });

      client.invalidateQueries({
        predicate: (query) => query.queryKey.includes("product"),
      });
    },
  });
};
