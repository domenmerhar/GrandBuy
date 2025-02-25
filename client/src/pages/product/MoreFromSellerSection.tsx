import { Column } from "../../Util/Column";
import { Header } from "../../Util/Header";
import { useQuery } from "@tanstack/react-query";
import HorizontalProducts from "../main/HorizontalProducts";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { useTranslation } from "react-i18next";
import { useProduct } from "./useProduct";
import { getSellerProducts } from "../../api/product/getSellerProducts";

export const MoreFromSellerSection = () => {
  const { t } = useTranslation();

  const { data: dataProduct } = useProduct();
  const sellerId = dataProduct?.data?.product?.user?._id || "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["seller-products", sellerId, 1],
    queryFn: () => getSellerProducts(sellerId, 1),
  });

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <Column $gap="8px">
      <Header $size="small" $color="orange">
        {t("moreFromSeller")}
      </Header>

      <HorizontalProducts products={data.data.products} />
    </Column>
  );
};
