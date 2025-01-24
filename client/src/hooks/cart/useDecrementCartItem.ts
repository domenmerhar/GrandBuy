import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { decrementCartItem } from "../../api/cart/decrementCartItem";

export const useDecrementCartItem = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: decrementCartItem,

    onMutate: () => {
      toast.loading("Decrementing quantity...", { id: "decrement-cart-item" });
    },

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error("Failed to decrement quantity", {
          id: "decrement-cart-item",
        });

      toast.success("Decremented quantity", { id: "decrement-cart-item" });

      client.invalidateQueries({
        predicate: (query) => query.queryKey[0].includes("cartItems"),
      });
    },
  });
};
