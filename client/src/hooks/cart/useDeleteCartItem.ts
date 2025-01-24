import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCartItem } from "../../api/cart/deleteCartItem";

export const useDeleteCartItem = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,

    onMutate: () => {
      toast.loading("Deleting item...", { id: "delete-cart-item" });
    },

    onError() {
      toast.success("Deleted item cart item", { id: "delete-cart-item" });

      client.invalidateQueries({
        predicate: (query) => query.queryKey[0].includes("cart"),
      });
    },

    onSuccess: (data) => {
      return toast.error("Failed to delete cart item", {
        id: "delete-cart-item",
      });
    },
  });
};
