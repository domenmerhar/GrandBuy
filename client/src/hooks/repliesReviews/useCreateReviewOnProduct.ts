import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import createReviewOnProduct from "../../api/repliesReviews/createReviewOnProduct";

/**
 * useCreateReviewOnProduct hook za ustvarjanje ocene izdelka.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za ustvarjanje ocene.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: createReview } = useCreateReviewOnProduct();
 * createReview({ JWT: "your_jwt_token", productId: "product_id", rating: 5, text: "review_text" });
 */

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

      toast.success(t("replySent"), { id: "review" });
      client.invalidateQueries({
        predicate: (query) =>
          String(query.queryKey[0]).includes("reviews") &&
          String(query.queryKey[1]) === data?.data?.product,
      });
    },
  });
};
