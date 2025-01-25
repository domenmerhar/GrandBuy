import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCartItemQuantity } from "../../api/cart/updateCartItemQuantity";

export const useUpdateCartItemQuantity = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: updateCartItemQuantity,

    onMutate: () => {
      toast.loading("Updating quantity...", { id: "update-cart-item" });
    },

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error("Failed to update quantity", {
          id: "update-cart-item",
        });

      toast.success("Updated quantity", { id: "update-cart-item" });

      client.invalidateQueries({
        predicate: (query) => query.queryKey[0].includes("cartItems"),
      });
    },
  });
};
