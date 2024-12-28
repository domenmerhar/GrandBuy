import styled from "styled-components";
import { Column } from "../Util/Column";
import { HeaderUppercaseBold } from "../Util/HeaderUppercaseBold";
import { ProductInfoParagraph } from "../pages/product/ProductInfoParagraph";
import { Stepper } from "../Util/Stepper";
import { Button } from "../Util/Button";
import { FC } from "react";

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

interface ProductInfoProps {
  title: string;
  price: string;
  shipping: string;
  averageRating: string;
  unitsSold: string;
  createdBy: string;
  uploaded: string;
}

export const ProductInfo: FC<ProductInfoProps> = ({
  title,
  price,
  shipping,
  averageRating,
  unitsSold,
  createdBy,
  uploaded,
}) => {
  return (
    <StyledProductInfo $gap="2.4rem" $justifyContent="space-around">
      <Info $gap=".8rem">
        <HeaderUppercaseBold>{title}</HeaderUppercaseBold>
        <ProductInfoParagraph title="Price" value={price} />
        <ProductInfoParagraph title="Shipping" value={shipping} />
        <ProductInfoParagraph title="Average Rating" value={averageRating} />
        <ProductInfoParagraph title="Units sold" value={unitsSold} />
        <ProductInfoParagraph title="Created by" value={createdBy} />
        <ProductInfoParagraph title="Uploaded" value={uploaded} />
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
