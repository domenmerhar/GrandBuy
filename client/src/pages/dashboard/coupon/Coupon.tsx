import styled from "styled-components";
import { BadgeCard } from "../../../Util/BadgeCard";
import { Column } from "../../../Util/Column";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiChevronDown, HiOutlineClock, HiOutlinePencil } from "react-icons/hi";
import ExpandingList from "../../../Components/ExpandingList";
import ExpandingThreeDotsButton from "../../../Components/ExpandingThreeDotsButton";
import { Row } from "../../../Util/Row";
import { CouponProps } from "../../../Util/types";
import { Modal } from "../../../Util/Modal";
import { useSearchParams } from "react-router-dom";
import useExpireCoupon from "../../../hooks/coupon/useExpireCoupon";
import { useJWT } from "../../../hooks/useJWT";

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

interface Coupon extends CouponProps {
  couponId: string;
  code: string;
  discount: number;
  validUntil: string;
  affectedItems: { _id: string; name: string }[];
}

export const Coupon: FC<Coupon> = React.memo(
  ({
    couponId,
    code,
    discount,
    validUntil,
    affectedItems,

    setCode,
    setDiscount,
    setExpireAt,
    setProductIds,
  }) => {
    const { t } = useTranslation();
    const [, setSearchParams] = useSearchParams();
    const { setIsOpen: setIsOpenModal } = Modal.useModalContext();

    const { JWT } = useJWT();
    const { mutate: expireCoupon } = useExpireCoupon();

    const isShort = affectedItems.length < 10;
    const [isOpen, setIsOpen] = useState<boolean>(isShort);

    const handleEdit = () => {
      setCode(code);
      setDiscount(discount);
      setExpireAt(new Date(validUntil).getTime());
      setProductIds(affectedItems.map(({ _id }) => _id));

      setIsOpenModal(true);
      setSearchParams((prev) => {
        prev.set("coupon-id", couponId);
        return prev;
      });
    };

    const handleExpireCoupon = () => {
      expireCoupon({ JWT, couponId });
    };

    const renderItems = (endIndex?: number) =>
      affectedItems
        .slice(0, endIndex)
        .map(({ _id, name }: { _id: string; name: string }) => (
          <Li key={_id}>{name}</Li>
        ));

    return (
      <BadgeCard>
        <Row $justifyContent="space-between">
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

          <ExpandingList start="right">
            <ExpandingThreeDotsButton />

            <ExpandingList.List>
              <ExpandingList.Ul>
                <ExpandingList.Li onClick={handleEdit}>
                  <HiOutlinePencil />
                  {t("edit")}
                </ExpandingList.Li>

                <ExpandingList.Li onClick={handleExpireCoupon}>
                  <HiOutlineClock />
                  {t("expire")}
                </ExpandingList.Li>
              </ExpandingList.Ul>
            </ExpandingList.List>
          </ExpandingList>
        </Row>

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
            <BadgeCard.ItemList>{renderItems()}</BadgeCard.ItemList>
          ) : (
            <>
              <BadgeCard.ItemList>
                {renderItems(5)}
                ...
              </BadgeCard.ItemList>
            </>
          )}
        </Column>
      </BadgeCard>
    );
  }
);
