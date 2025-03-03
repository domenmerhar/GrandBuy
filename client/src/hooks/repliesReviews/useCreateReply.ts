import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import createReply from "../../api/repliesReviews/createReply";

/**
 * useCreateReply hook za ustvarjanje odgovora na oceno.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za ustvarjanje odgovora.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: createReplyMutation } = useCreateReply();
 * createReplyMutation({ JWT: "your_jwt_token", reviewId: "review_id", text: "reply_text" });
 */

export default () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: createReply,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("somethingWentWrong"), {
          id: "reply",
        });

      toast.success(t("replySent"), { id: "reply" });
      client.invalidateQueries({
        predicate: (query) =>
          String(query.queryKey[0]).includes("replies") &&
          String(query.queryKey[1]) === data?.data?.reply?.review,
      });
    },
  });
};
