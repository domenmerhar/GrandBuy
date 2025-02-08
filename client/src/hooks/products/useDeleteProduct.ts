import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../api/product/deleteProduct";

export const useDeleteProduct = () => {
  const client = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteProduct,

    onSettled: (data) => {
      if (data === undefined) {
        toast.success("Product deleted", { id: "delete-product" });

        client.invalidateQueries({
          predicate: (query) => query.queryKey.includes("product"),
        });

        return navigate("/");
      }

      toast.error("Failed to create product", {
        id: "delete-product",
      });
    },
  });
};
