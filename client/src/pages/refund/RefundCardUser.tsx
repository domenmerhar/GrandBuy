import styled from "styled-components";
import { Badge } from "../../Util/Badge";
import { BadgeCard } from "../../Util/BadgeCard";
import { Row } from "../../Util/Row";
import { FC } from "react";
import { BadgeColor, RefundStatus } from "../../Util/types";

const Date = styled.span`
  color: var(--gray-6);
  font-weight: 500;
`;

interface RefundCardUserProps {
  date: string;
  status: RefundStatus;
  quantity: number;
  productName: string;
  reason: string;
}

export const RefundCardUser: FC<RefundCardUserProps> = ({
  date,
  status,
  quantity,
  productName,
  reason,
}) => {
  let badgeColor: BadgeColor;

  switch (status) {
    case "approved":
      badgeColor = "green";
      break;
    case "rejected":
      badgeColor = "red";
      break;
    case "pending":
    default:
      badgeColor = "yellow";
  }

  return (
    <BadgeCard>
      <Row $justifyContent="space-between" $alignItems="center">
        <Date>{date}</Date>

        <Badge $color={badgeColor}>{status}</Badge>
      </Row>

      <BadgeCard.ItemList>
        <li>
          {quantity}x {productName}
        </li>
      </BadgeCard.ItemList>

      <BadgeCard.P>{reason}</BadgeCard.P>
    </BadgeCard>
  );
};
