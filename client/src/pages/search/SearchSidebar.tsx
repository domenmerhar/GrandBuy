import styled from "styled-components";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { Sidebar } from "../../Util/Sidebar";
import { CheckboxWithText } from "./CheckboxWithText";
import { RatingInteractive } from "./RatingInteractive";
import { SliderFilter } from "./SliderFilter";

const ContentHolder = styled.div`
  display: flex;
  flex-direction: column;

  & > h2:not(:first-child) {
    margin-top: 12px;
  }
`;

export const SearchSidebar = () => {
  return (
    <Sidebar>
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
    </Sidebar>
  );
};
