import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../api/product/deleteProduct";
import { useTranslation } from "react-i18next";

/**
 * useDeleteProduct hook za brisanje izdelka.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za brisanje izdelka.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: deleteProductMutation } = useDeleteProduct();
 * deleteProductMutation({ JWT: "your_jwt_token", id: "product_id" });
 */

export const useDeleteProduct = () => {
  const { t } = useTranslation();
  const client = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteProduct,

    onSettled: (data) => {
      if (data === undefined) {
        toast.success(t("productDeleted"), { id: "delete-product" });

        client.invalidateQueries({
          predicate: (query) => query.queryKey.includes("product"),
        });

        return navigate("/");
      }

      toast.error(t("failedToDeleteProduct"), {
        id: "delete-product",
      });
    },
  });
};
