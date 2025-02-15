import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../api/product/deleteProduct";
import { useTranslation } from "react-i18next";

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
