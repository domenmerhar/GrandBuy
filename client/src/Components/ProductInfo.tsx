import styled from "styled-components";
import { Column } from "../Util/Column";
import { HeaderUppercaseBold } from "../Util/HeaderUppercaseBold";
import { ProductInfoParagraph } from "../pages/product/ProductInfoParagraph";
import { Stepper } from "../Util/Stepper";
import { Button } from "../Util/Button";
import { FC } from "react";
import { Discount } from "../Util/Discount";
import { useAuthContext } from "../contexts/AuthContext";

const StyledProductInfo = styled(Column)`
  min-width: 25rem;
  justify-content: flex-start;
`;

const Info = styled(Column)`
  font-size: 2rem;
  position: relative;
  & > :first-child {
    font-size: 3.6rem;
    margin-bottom: 1.6rem;
  }

  /* & div:nth-of-type(1) {
    margin-top: 1.6rem;
  } */
`;

const StyledDiscount = styled(Discount)`
  right: -20%;
  top: -20%;
`;

interface ProductInfoProps {
  title: string;
  price: string;
  shipping: string;
  averageRating: string;
  unitsSold: string;
  createdBy: string;
  uploaded: string;
  discount: number;
}

export const ProductInfo: FC<ProductInfoProps> = ({
  title,
  price,
  shipping,
  averageRating,
  unitsSold,
  createdBy,
  uploaded,
  discount,
}) => {
  const [{ JWT }] = useAuthContext();

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
        {discount ? <StyledDiscount>-{discount}%</StyledDiscount> : null}
      </Info>

      {JWT ? (
        <>
          <Stepper searchParamName="quantity" />

          <Column $gap=".8rem">
            <Button $color="orange" $shape="oval" $size="medium">
              Add to Cart
            </Button>

            <Button $color="gray" $shape="oval" $size="medium">
              Buy now
            </Button>
          </Column>
        </>
      ) : null}
    </StyledProductInfo>
  );
};
