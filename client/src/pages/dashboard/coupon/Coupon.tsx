import styled from "styled-components";
import { BadgeCard } from "../../../Util/BadgeCard";
import { Column } from "../../../Util/Column";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const GrayedText = styled.span`
  color: var(--gray-7);
`;

const AffectedItems = styled.p`
  font-weight: 550;
  font-size: 1.8rem;
`;

const Li = styled.li`
  &:before {
    content: "-";
    margin-right: 4px;
  }

  margin-left: 8px;
`;

interface Coupon {
  code: string;
  discount: number;
  validUntil: string;
  affectedItems: string[];
}

export const Coupon: FC<Coupon> = ({
  code,
  discount,
  validUntil,
  affectedItems,
}) => {
  const { t } = useTranslation();

  return (
    <BadgeCard>
      <Column $alignItems="flex-start" $gap="2px">
        <p>
          <GrayedText>{t("coupon")}:</GrayedText> {code}
        </p>

        <p>
          <GrayedText>{t("discount")}:</GrayedText> {discount}%
        </p>

        <p>
          <GrayedText>{t("validUntil")}:</GrayedText> {validUntil}
        </p>
      </Column>

      <Column $gap="4px">
        <AffectedItems>{t("affectedItems")}:</AffectedItems>
        <BadgeCard.ItemList>
          {affectedItems.map((item, i) => (
            <Li key={i}>{item}</Li>
          ))}
        </BadgeCard.ItemList>
      </Column>
    </BadgeCard>
  );
};
