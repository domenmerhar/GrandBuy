import styled from "styled-components";
import { Column } from "../Util/Column";
import { HeaderUppercaseBold } from "../Util/HeaderUppercaseBold";
import { ProductInfoParagraph } from "../pages/product/ProductInfoParagraph";
import { Stepper } from "../Util/Stepper";
import { Button } from "../Util/Button";
import { FC } from "react";
import { Discount } from "../Util/Discount";
import { useAuthContext } from "../contexts/AuthContext";
import { Row } from "../Util/Row";
import { AddToWishlistButton } from "../pages/product/AddToWishlistButton";
import { useAddProductToCard } from "../hooks/cart/useAddProductToCard";
import { useParams, useSearchParams } from "react-router-dom";

const StyledProductInfo = styled(Column)`
  min-width: 25rem;
  justify-content: flex-start;
`;

const Info = styled(Column)`
  font-size: 2rem;
  position: relative;

  & h2 {
    font-size: 3.6rem;
  }
`;

const StyledDiscount = styled(Discount)`
  right: -20%;
  top: -20%;
`;

const HeaderHolder = styled(Row)`
  margin-bottom: 1.6rem;
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
  const [{ JWT, role }] = useAuthContext();

  const [searchParams] = useSearchParams();
  const { productId } = useParams<{ productId: string }>();

  const { mutate } = useAddProductToCard();

  const quantity = Number(searchParams.get("quantity")) || 1;

  const handleClick = () => mutate({ JWT, productId: productId!, quantity });

  return (
    <StyledProductInfo $gap="2.4rem" $justifyContent="space-around">
      <Info $gap=".8rem">
        <HeaderHolder $justifyContent="space-between" $alignItems="center">
          <HeaderUppercaseBold>{title}</HeaderUppercaseBold>

          {role === "user" ? <AddToWishlistButton /> : null}
        </HeaderHolder>

        <ProductInfoParagraph title="Price" value={price} />
        <ProductInfoParagraph title="Shipping" value={shipping} />
        <ProductInfoParagraph title="Average Rating" value={averageRating} />
        <ProductInfoParagraph title="Units sold" value={unitsSold} />
        <ProductInfoParagraph title="Created by" value={createdBy} />
        <ProductInfoParagraph title="Uploaded" value={uploaded} />
        {discount ? <StyledDiscount>-{discount}%</StyledDiscount> : null}
      </Info>

      {role === "user" ? (
        <>
          <Stepper searchParamName="quantity" />

          <Column $gap=".8rem">
            <Button
              $color="orange"
              $shape="oval"
              $size="medium"
              onClick={handleClick}
            >
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
