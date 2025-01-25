import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addOrder } from "../../api/order/addOrder";

export const useAddOrder = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: addOrder,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error("Failed to add to cart", { id: "add-order" });

      client.invalidateQueries({
        predicate: (query) =>
          (query.queryKey[0] as string).includes("cartItems") ||
          query.queryKey[0] === "cartItemsCount",
      });

      console.log("success", data);
      window.location.href = data?.session;
    },
  });
};
