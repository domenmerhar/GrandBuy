import styled from "styled-components";
import { BadgeCard } from "../../../Util/BadgeCard";
import { Column } from "../../../Util/Column";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiChevronDown } from "react-icons/hi";

const GrayedText = styled.span`
  color: var(--gray-7);
`;

const ChevronHolder = styled.span<{ $isOpen: boolean }>`
  transition: all 200ms;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};

  &:hover {
    cursor: pointer;
  }
`;

const AffectedItems = styled.p`
  display: flex;
  align-items: center;
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
  affectedItems: { _id: string; name: string }[];
}

export const Coupon: FC<Coupon> = ({
  code,
  discount,
  validUntil,
  affectedItems,
}) => {
  const { t } = useTranslation();
  const isShort = affectedItems.length < 10;
  const [isOpen, setIsOpen] = useState<boolean>(isShort);

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
        <AffectedItems onClick={() => setIsOpen((prev) => !prev)}>
          {!isShort ? (
            <ChevronHolder $isOpen={isOpen}>
              <HiChevronDown />
            </ChevronHolder>
          ) : null}
          {t("affectedItems")}:
        </AffectedItems>
        {isOpen || isShort ? (
          <BadgeCard.ItemList>
            {affectedItems.map(
              ({ _id, name }: { _id: string; name: string }) => (
                <Li key={_id}>{name}</Li>
              )
            )}
          </BadgeCard.ItemList>
        ) : (
          <>
            <BadgeCard.ItemList>
              {affectedItems
                .slice(0, 5)
                .map(({ _id, name }: { _id: string; name: string }) => (
                  <Li key={_id}>{name}</Li>
                ))}
              ...
            </BadgeCard.ItemList>
          </>
        )}
      </Column>
    </BadgeCard>
  );
};
