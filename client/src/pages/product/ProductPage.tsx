import { Content } from "../../Util/Content";
import { MoreFromSellerSection } from "./MoreFromSellerSection";
import { SaleSection } from "../main/SaleSection";
import { SliderInfoRow } from "./SliderInfoRow";
import { ProductDescription } from "./ProductDescription";

export const ProductPage = () => {
  return (
    <Content>
      <SliderInfoRow />
      <ProductDescription markdownSrc="http://localhost:3000/files/test.md" />
      <MoreFromSellerSection />
      <SaleSection />
    </Content>
  );
};
