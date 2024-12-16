import { Column } from "../../Util/Column";
import { Header } from "../../Util/Header";
import HorizontalProducts from "../main/HorizontalProducts";

export const MoreFromSellerSection = () => {
  return (
    <Column $gap="8px">
      <Header $size="small" $color="orange">
        More from seller
      </Header>
      <HorizontalProducts />
    </Column>
  );
};
