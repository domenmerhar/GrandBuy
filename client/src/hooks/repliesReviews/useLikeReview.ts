import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import likeReview from "../../api/repliesReviews/likeReview";

/**
 * useLikeReview hook za dodajanje/odstranjevanje všečka na oceno.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za dodajanje/odstranjevanje všečka.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: like } = useLikeReview();
 * like({ JWT: "your_jwt_token", reviewId: "review_id" });
 */

export default () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: likeReview,

    onSuccess: (data) => {
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
