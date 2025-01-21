import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProductToCart } from "../../api/cart/addProductToCard";

export const useAddProductToCard = () => {
  //TODO: Invalidate cartItems, cartCount
  const client = useQueryClient();

  return useMutation({
    mutationFn: addProductToCart,

    onMutate: () => {
      toast.loading("Adding to cart...", { id: "add-to-cart" });
    },

    onSuccess: (data) => {
      console.log(data);
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error("Failed to add to cart", { id: "add-to-cart" });

      toast.success("Added to cart", { id: "add-to-cart" });

      //   client.invalidateQueries({
      //     predicate: (query) => query.queryKey.includes("wishlistItems"),
      //   });
    },
  });
};
