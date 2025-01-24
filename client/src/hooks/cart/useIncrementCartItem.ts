import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementCartItem } from "../../api/cart/incrementCartItem";
import toast from "react-hot-toast";

export const useIncrementCartItem = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: incrementCartItem,

    onMutate: () => {
      toast.loading("Incrementing quantity...", { id: "increment-cart-item" });
    },

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error("Failed to increment quantity", {
          id: "increment-cart-item",
        });

      toast.success("Incremented quantity", { id: "increment-cart-item" });

      client.invalidateQueries({
        predicate: (query) => query.queryKey[0].includes("cartItems"),
      });
    },
  });
};
