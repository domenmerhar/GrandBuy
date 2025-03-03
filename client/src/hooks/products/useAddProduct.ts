import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProduct } from "../../api/product/addProduct";
import { useTranslation } from "react-i18next";

/**
 * useAddProduct hook za dodajanje novega izdelka.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za dodajanje izdelka.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: addProductMutation } = useAddProduct();
 * addProductMutation({ JWT: "your_jwt_token", productData: { ... } });
 */

export const useAddProduct = () => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation({
    mutationFn: addProduct,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("failedToCreateProduct"), { id: "add-product" });

      client.invalidateQueries({
        predicate: (query) => query.queryKey.includes("product"),
      });
    },
  });
};
