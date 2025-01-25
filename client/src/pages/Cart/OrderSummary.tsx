import styled from "styled-components";
import { BlankCard } from "../../Util/BlankCard";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { SummaryRow } from "./SummaryRow";

const StyledOrderSummary = styled(BlankCard)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Hr = styled.hr`
  background-color: var(--gray-8);
`;

export const OrderSummary = () => {
  return (
    <StyledOrderSummary>
      <HeaderUppercaseBold>Summary</HeaderUppercaseBold>

      <SummaryRow name="Items" price="$320.99" />
      <SummaryRow name="Shipping" price="$41.99" />
      <SummaryRow name="Coupons" price="$30.99" />
      <Hr />
      <SummaryRow name="Total" price="$331.99" />
    </StyledOrderSummary>
  );
};
