import styled from "styled-components";
import { BadgeCard } from "../../../Components/Card/BadgeCard";
import { Column } from "../../../Util/Column";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiChevronDown, HiOutlineClock, HiOutlinePencil } from "react-icons/hi";
import ExpandingList from "../../../Components/ExpandingList";
import ExpandingThreeDotsButton from "../../../Components/ExpandingThreeDotsButton";
import { Row } from "../../../Util/Row";
import { CouponProps } from "../../../Util/types";
import { Modal } from "../../../Components/Modal";
import { useSearchParams } from "react-router-dom";
import useExpireCoupon from "../../../hooks/coupon/useExpireCoupon";
import { useJWT } from "../../../hooks/useJWT";

const GrayedText = styled.span`
  color: var(--gray-7);
`;

const ChevronHolder = styled.span<{ $isOpen: boolean }>`
  transition: all 200ms;
  transform: ${({ $isOpen }) =>
    $isOpen ? "rotate(180deg)" : "rotate(0deg) translateY(15%)"};

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

/**
 * Komponenta za prikaz kupona.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.couponId - ID kupona.
 * @param {string} props.code - Koda kupona.
 * @param {number} props.discount - Popust kupona v odstotkih.
 * @param {string} props.validUntil - Veljavnost kupona do datuma.
 * @param {Array} props.affectedItems - Seznam predmetov, na katere kupon vpliva.
 * @param {Function} props.setCode - Funkcija za nastavitev kode kupona.
 * @param {Function} props.setDiscount - Funkcija za nastavitev popusta kupona.
 * @param {Function} props.setExpireAt - Funkcija za nastavitev datuma veljavnosti kupona.
 * @param {Function} props.setProductIds - Funkcija za nastavitev ID-jev izdelkov, na katere kupon vpliva.
 * @returns {JSX.Element} JSX element, ki predstavlja kupon.
 *
 * @example
 * // Uporaba komponente
 * <Coupon
 *   couponId="123"
 *   code="SAVE20"
 *   discount={20}
 *   validUntil="2025-12-31"
 *   affectedItems={[{ _id: "1", name: "Product 1" }, { _id: "2", name: "Product 2" }]}
 *   setCode={() => {}}
 *   setDiscount={() => {}}
 *   setExpireAt={() => {}}
 *   setProductIds={() => {}}
 * />
 */

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
