import { Content } from "../../Util/Content";
import { MoreFromSellerSection } from "./MoreFromSellerSection";
import { SaleSection } from "../main/SaleSection";
import { SliderInfoRow } from "./SliderInfoRow";
import { ProductDescription } from "./ProductDescription";
import { Column } from "../../Util/Column";

export const ProductPage = () => {
  return (
    <Content>
      <Column $gap="6.4rem">
        <SliderInfoRow />
        <ProductDescription markdownSrc="http://localhost:3000/files/test.md" />
        <MoreFromSellerSection />
        <SaleSection />
      </Column>
    </Content>
  );
};
