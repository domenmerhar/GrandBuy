import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyCoupon } from "../../api/cart/applyCoupon";
import toast from "react-hot-toast";

export const useApplyCoupon = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: applyCoupon,

    onMutate: () => {
      toast.loading("Applying coupon...", { id: "apply-coupon" });
    },

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error("Failed to apply coupon", { id: "apply-coupon" });

      toast.success("Applied coupon", { id: "apply-coupon" });

      client.invalidateQueries({
        predicate: (query) =>
          (query.queryKey[0] as string).includes("cartItemsSummary"),
      });
    },
  });
};
