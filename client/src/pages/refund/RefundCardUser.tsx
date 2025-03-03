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

/**
 * Komponenta za prikaz kartice vračila za uporabnika.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.date - Datum zahteve za vračilo.
 * @param {string} props.status - Stanje vračila.
 * @param {number} props.quantity - Količina izdelka.
 * @param {string} props.productName - Ime izdelka.
 * @param {string} props.reason - Razlog za vračilo.
 * @returns {JSX.Element} JSX element, ki predstavlja kartico vračila za uporabnika.
 *
 * @example
 * // Uporaba komponente
 * <RefundCardUser
 *   date="2025-03-03"
 *   status="pending"
 *   quantity={2}
 *   productName="Izdelek A"
 *   reason="Poškodovan izdelek"
 * />
 */

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
