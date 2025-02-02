import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMe } from "../useMe";
import { useSearchParams } from "react-router-dom";
import { requestRefund } from "../../api/refund/requestRefund";

export const useRequestRefund = () => {
  const [searchParams] = useSearchParams();
  const client = useQueryClient();
  const { data } = useMe();

  const userId = data?.data?._id;
  const page = Number(searchParams.get("page")) || 1;

  return useMutation({
    mutationFn: requestRefund,

    onSuccess: (data) => {
      console.log(data);

      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error("Failed to request refund", {
          id: "request-refund",
        });

      toast.success("Requested refund", { id: "request-refund" });

      client.invalidateQueries({
        queryKey: ["orders", userId, page],
      });
    },
  });
};
