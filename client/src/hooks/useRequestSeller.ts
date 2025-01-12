import { useMutation } from "@tanstack/react-query";
import { requestSeller } from "../api/user/requestSeller";
import toast from "react-hot-toast";

export const useRequestSeller = () => {
  const { mutate } = useMutation({
    mutationFn: requestSeller,

    onMutate: () =>
      toast.loading("Sending request ...", { id: "requestSeller" }),

    onSuccess: (data) => {
      if (data?.status !== "success") {
        toast.error("Something went wrong", {
          id: "requestSeller",
        });
        return;
      }

      toast.success("Request sent", { id: "requestSeller" });
    },
  });

  return { mutate };
};
