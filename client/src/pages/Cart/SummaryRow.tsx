import { FC } from "react";
import { Row } from "../../Util/Row";
import styled from "styled-components";

const Price = styled.span`
  font-weight: 500;
`;

interface SummaryRowProps {
  name: string;
  price: string;
}

export const SummaryRow: FC<SummaryRowProps> = ({ name, price }) => {
  return (
    <Row $justifyContent="space-between">
      <span>{name}</span>
      <Price>{price}</Price>
    </Row>
  );
};
