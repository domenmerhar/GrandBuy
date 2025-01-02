import { Column } from "../../Util/Column";
import { Header } from "../../Util/Header";
import { useQuery } from "@tanstack/react-query";
import HorizontalProducts from "../main/HorizontalProducts";
import { getSellerProducts } from "../../api/getSellerProducts";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";

const sellerId = "66dd4bf8240a800b87c13da2";

export const MoreFromSellerSection = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["seller-products", sellerId, 1],
    queryFn: () => getSellerProducts(sellerId, 1),
  });

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <Column $gap="8px">
      <Header $size="small" $color="orange">
        More from seller
      </Header>

      <HorizontalProducts products={data.data.products} />
    </Column>
  );
};
