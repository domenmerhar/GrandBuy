import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Modal } from "../../Components/Modal";
import { useParams } from "react-router-dom";
import { updateProduct } from "../../api/product/updateProduct";

/**
 * useEditProduct hook za urejanje obstoječega izdelka.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za urejanje izdelka.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: editProductMutation } = useEditProduct();
 * editProductMutation({ JWT: "your_jwt_token", productId: "product_id", productData: { ... } });
 */

export const useEditProduct = () => {
  const { t } = useTranslation();
  const client = useQueryClient();
  const { closeModal } = Modal.useModalContext();

  const { productId } = useParams();

  return useMutation({
    mutationFn: updateProduct,

    onSuccess: (data) => {
      console.log(data);
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("somethingWentWrong"), { id: "edit-product" });

      client.invalidateQueries({ queryKey: ["product", productId] });
      closeModal();
    },
  });
};
