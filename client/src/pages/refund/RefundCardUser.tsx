import styled from "styled-components";
import { Badge } from "../../Util/Badge";
import { BadgeCard } from "../../Components/Card/BadgeCard";
import { Row } from "../../Util/Row";
import { FC } from "react";
import { BadgeColor, RefundStatus } from "../../Util/types";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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

        <Badge $color={badgeColor}>{t(status)}</Badge>
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
