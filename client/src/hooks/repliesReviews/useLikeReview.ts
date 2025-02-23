import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import likeReview from "../../api/repliesReviews/likeReview";

export default () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: likeReview,

    onSuccess: (data) => {
      console.log(data);

      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("somethingWentWrong"), {
          id: "reply",
        });

      client.invalidateQueries({
        predicate: (query) => String(query.queryKey[0]).includes("reviews"),
      });
    },
  });
};
