import styled from "styled-components";
import { HeaderUppercaseBold } from "./HeaderUppercaseBold";
import { CheckboxWithText } from "../pages/search/CheckboxWithText";
import { SliderFilter } from "../pages/search/SliderFilter";
import { RatingInteractive } from "../pages/search/RatingInteractive";
import { FC } from "react";

const ContentHolder = styled.div`
  display: flex;
  flex-direction: column;

  & > h2:not(:first-child) {
    margin-top: 12px;
  }
`;

interface ProductFilterProps {
  freeShipping?: boolean;
  sale?: boolean;
  rating?: boolean;
  price?: boolean;
}

export const ProductFilter: FC<ProductFilterProps> = ({
  freeShipping,
  sale,
  rating,
  price,
}) => {
  return (
    <ContentHolder>
      {freeShipping ? (
        <>
          <HeaderUppercaseBold>Delivery</HeaderUppercaseBold>
          <CheckboxWithText id="free-shipping" label="Free Shipping" />
        </>
      ) : null}

      {sale ? (
        <>
          <HeaderUppercaseBold>Discount</HeaderUppercaseBold>
          <CheckboxWithText id="sale" label="Sale" />
        </>
      ) : null}

      {rating ? (
        <>
          <HeaderUppercaseBold>Rating</HeaderUppercaseBold>
          <RatingInteractive />
        </>
      ) : null}

      {price ? (
        <>
          <HeaderUppercaseBold>Price</HeaderUppercaseBold>
          <SliderFilter />
        </>
      ) : null}
    </ContentHolder>
  );
};
