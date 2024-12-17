import styled from "styled-components";
import { Column } from "../../Util/Column";
import { useParams } from "react-router-dom";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { ProductInfoParagraph } from "./ProductInfoParagraph";

const StyledProductInfo = styled(Column)`
  min-width: 30rem;

  font-size: 2rem;
  & > :first-child {
    font-size: 3.6rem;
    margin-bottom: 0.8rem;
  }
`;

export const ProductInfo = () => {
  const { productId } = useParams();

  return (
    <StyledProductInfo $gap=".6rem">
      <HeaderUppercaseBold>{productId}</HeaderUppercaseBold>
      <ProductInfoParagraph title="Price" value="$299.99" />
      <ProductInfoParagraph title="Shipping" value="$20.99" />
      <ProductInfoParagraph title="Average Rating" value="3" />
    </StyledProductInfo>
  );
};
