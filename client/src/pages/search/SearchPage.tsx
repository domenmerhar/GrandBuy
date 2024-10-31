import styled from "styled-components";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { Sidebar } from "../../Util/Sidebar";
import { IOption } from "../../Util/types";
import { CheckboxWithText } from "./CheckboxWithText";
import { Select } from "../../Util/Select";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";

const selectOptions: IOption[] = [
  { name: "Sort by most orders", value: "-orders" },
  { name: "Sort by least orders", value: "orders" },
  { name: "Sort by most expensive", value: "-price" },
  { name: "Sort by cheapest", value: "price" },
  { name: "Sort by date (youngest)", value: "-createdAt" },
  { name: "Sort by date (oldest)", value: "createdAt" },
];

const ContentHolder = styled.div`
  display: flex;
  flex-direction: column;

  & > h2:not(:first-child) {
    margin-top: 12px;
  }
`;

const Layout = styled.div`
  display: flex;
  gap: 6.4rem;
  padding-right: 6.4rem;

  & > *:nth-child(3) {
    padding-top: 2.4rem;
  }
`;

const MainContent = styled.div`
  max-width: 1265px;
  display: flex;
  flex: 1;
  flex-direction: column;

  & > select {
    align-self: flex-end;
  }
`;

const tooltipArray = [
  "0.5+",
  "1.0+",
  "1.5+",
  "2.0+",
  "2.5+",
  "3.0+",
  "3.5+",
  "4.0+",
  "4.5+",
  "5.0",
];

const fillColorArray = [
  "#f17a45",
  "#f17a45",
  "#f19745",
  "#f19745",
  "#f1a545",
  "#f1a545",
  "#f1b345",
  "#f1b345",
  "#f1d045",
  "#f1d045",
];

export const SearchPage = () => {
  const [rating, setRating] = useState<number>(0);
  const handleRating = (rate: number) => setRating(rate);

  console.log(rating);
  return (
    <Layout>
      <Sidebar>
        <ContentHolder>
          <HeaderUppercaseBold>Delivery</HeaderUppercaseBold>
          <CheckboxWithText id="free-shipping" label="Free Shipping" />

          <HeaderUppercaseBold>Discount</HeaderUppercaseBold>
          <CheckboxWithText id="sale" label="Sale" />

          <HeaderUppercaseBold>Rating</HeaderUppercaseBold>
          <Rating
            onClick={handleRating}
            size={32}
            transition
            allowFraction
            showTooltip
            tooltipArray={tooltipArray}
            tooltipDefaultText="/"
            fillColorArray={fillColorArray}
            tooltipStyle={{
              backgroundColor: "transparent",
              color: "var(--gray-8)",
              fontWeight: "500",
              fontSize: "1.8rem",
            }}
          />
        </ContentHolder>
      </Sidebar>
      <MainContent>
        <Select options={selectOptions} />
      </MainContent>
    </Layout>
  );
};
