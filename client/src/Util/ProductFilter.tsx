import styled from "styled-components";
import { HeaderUppercaseBold } from "./HeaderUppercaseBold";
import { CheckboxWithText } from "../pages/search/CheckboxWithText";
import { SliderFilter } from "../pages/search/SliderFilter";
import { RatingInteractive } from "../pages/search/RatingInteractive";

const ContentHolder = styled.div`
  display: flex;
  flex-direction: column;

  & > h2:not(:first-child) {
    margin-top: 12px;
  }
`;

export const ProductFilter = () => {
  return (
    <ContentHolder>
      <HeaderUppercaseBold>Delivery</HeaderUppercaseBold>
      <CheckboxWithText id="free-shipping" label="Free Shipping" />

      <HeaderUppercaseBold>Discount</HeaderUppercaseBold>
      <CheckboxWithText id="sale" label="Sale" />

      <HeaderUppercaseBold>Rating</HeaderUppercaseBold>
      <RatingInteractive />

      <HeaderUppercaseBold>Price</HeaderUppercaseBold>
      <SliderFilter />
    </ContentHolder>
  );
};
