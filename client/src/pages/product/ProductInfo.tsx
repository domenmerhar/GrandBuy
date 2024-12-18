import styled from "styled-components";
import { Column } from "../../Util/Column";
import { useParams } from "react-router-dom";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { ProductInfoParagraph } from "./ProductInfoParagraph";
import { Stepper } from "../../Util/Stepper";
import { Button } from "../../Util/Button";

const StyledProductInfo = styled(Column)`
  min-width: 25rem;
  height: 100%;
`;

const Info = styled(Column)`
  font-size: 2rem;
  & > :first-child {
    font-size: 3.6rem;
    margin-bottom: 1.6rem;
  }

  /* & div:nth-of-type(1) {
    margin-top: 1.6rem;
  } */
`;

export const ProductInfo = () => {
  const { productId } = useParams();

  return (
    <StyledProductInfo $gap="2.4rem" $justifyContent="space-around">
      <Info $gap=".8rem">
        <HeaderUppercaseBold>{productId}</HeaderUppercaseBold>
        <ProductInfoParagraph title="Price" value="$299.99" />
        <ProductInfoParagraph title="Shipping" value="$20.99" />
        <ProductInfoParagraph title="Average Rating" value="3" />
      </Info>

      <Stepper searchParamName="quantity" />

      <Column $gap=".8rem">
        <Button $color="orange" $shape="oval" $size="medium">
          Add to Cart
        </Button>

        <Button $color="gray" $shape="oval" $size="medium">
          Buy now
        </Button>
      </Column>
    </StyledProductInfo>
  );
};
