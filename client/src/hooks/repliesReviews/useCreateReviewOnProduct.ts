import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import createReviewOnProduct from "../../api/repliesReviews/createReviewOnProduct";

export default () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: createReviewOnProduct,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("somethingWentWrong"), {
          id: "reply",
        });

      console.log(data);

      toast.success(t("replySent"), { id: "review" });
      client.invalidateQueries({
        predicate: (query) => String(query.queryKey[0]).includes("reviews"),
      });
    },
  });
};
