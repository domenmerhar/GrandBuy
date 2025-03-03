import styled from "styled-components";
import { Row } from "../../Util/Row";
import { Link, useSearchParams } from "react-router-dom";
import { FC } from "react";
import ExpandingList from "../../Components/ExpandingList";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { ItemStatus } from "../../Util/types";
import { useTranslation } from "react-i18next";
import { Badge } from "../../Util/Badge";
import ExpandingThreeDotsButton from "../../Components/ExpandingThreeDotsButton";
import { Modal } from "../../Components/Modal";

const StyledOrderItem = styled(Row)`
  & div:nth-child(3) {
    margin-left: auto;
  }
`;

const Image = styled.img`
  width: 14rem;
  height: 14rem;
`;

const ProductInfoHolder = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.6rem;

  & + button {
    margin-left: auto;
  }
`;

const Product = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--gray-7);
  margin-bottom: 3.2rem;
`;

const Price = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--gray-8);
`;

const StatusButtonHolder = styled(Row)`
  margin-left: auto;
`;

const Quantity = styled.p``;

interface OrderItemProps {
  orderId: string;
  cartItemId: string;
  image: string;
  name: string;
  price: string;
  productId: string;
  quantity: number;
  status: ItemStatus;
}

export const OrderItem: FC<OrderItemProps> = ({
  cartItemId,
  image,
  name,
  price,
  productId,
  quantity,
  status,
}) => {
  const { t } = useTranslation();
  const { setIsOpen } = Modal.useModalContext();

  const [, setSearchParams] = useSearchParams();
  const handleRequestRefund = () => {
    setIsOpen(true);
    setSearchParams((prev) => {
      prev.set("cart-item-id", cartItemId);
      return prev;
    });
  };

  return (
    <StyledOrderItem $gap="2rem" $alignItems="flex-start">
      <Link to={`/product/${productId}?quantity=1&page=1&sort=-likesCount`}>
        <Image src={image} />
      </Link>

      <ProductInfoHolder>
        <Product>{name}</Product>

        <Price>
          {t("totalPrice")}: {price}
        </Price>
        <Quantity>
          {t("quantity")}: {quantity}
        </Quantity>
      </ProductInfoHolder>

      <StatusButtonHolder $gap=".8rem" $alignItems="center">
        {status === "cancelled" ? (
          <Badge $color="red" $size="medium">
            {t(status)}
          </Badge>
        ) : null}

        {status === "pending-refund" ? (
          <Badge $color="yellow">{t("pendingRefund")}</Badge>
        ) : null}
        {status === "refunded" ? (
          <Badge $color="green">{t(status)}</Badge>
        ) : null}
      </StatusButtonHolder>

      {status === "delivered" ? (
        <ExpandingList start="right">
          <ExpandingThreeDotsButton />

          <ExpandingList.List>
            <ExpandingList.Ul>
              <ExpandingList.Li onClick={handleRequestRefund}>
                <HiArrowUturnLeft />
                {t("refundItem")}
              </ExpandingList.Li>
            </ExpandingList.Ul>
          </ExpandingList.List>
        </ExpandingList>
      ) : null}
    </StyledOrderItem>
  );
};
