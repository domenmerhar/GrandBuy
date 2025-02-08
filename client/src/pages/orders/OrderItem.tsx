import styled from "styled-components";
import { Row } from "../../Util/Row";
import { Link } from "react-router-dom";
import { FC } from "react";
import { ButtonWithNotifcations } from "../../Components/Button/ButtonWithNotifcations";
import { HiDotsVertical, HiOutlineCheck } from "react-icons/hi";
import ExpandingList from "../../Components/ExpandingList";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { useConfirmOrder } from "../../hooks/order/useConfirmOrderDelivery";
import { useAuthContext } from "../../contexts/AuthContext";
import { ItemStatus } from "../../Util/types";
import { useRequestRefund } from "../../hooks/refund/useRequestRefund";

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
  delivered?: boolean;
}

export const OrderItem: FC<OrderItemProps> = ({
  orderId,
  cartItemId,
  image,
  name,
  price,
  productId,
  quantity,
  delivered,
  status,
}) => {
  const { JWT } = useAuthContext();
  const { mutate: confirmOrder } = useConfirmOrder();
  const { mutate: requestRefund } = useRequestRefund();

  const reason = "test";

  const handleConfirmOrder = () => confirmOrder({ JWT, orderId });
  const handleRequestRefund = () => requestRefund({ JWT, cartItemId, reason });

  return (
    <ExpandingList>
      <StyledOrderItem $gap="2rem" $alignItems="flex-start">
        <Link to={`/product/${productId}?quantity=1&page=1&sort=-likesCount`}>
          <Image src={image} />
        </Link>

        <ProductInfoHolder>
          <Product>{name}</Product>

          <Price>Total price: {price}</Price>
          <Quantity>Quantity: {quantity}</Quantity>
        </ProductInfoHolder>

        {delivered && status === "refunded" ? null : (
          <ExpandingList.Button>
            <ButtonWithNotifcations>
              <HiDotsVertical />
            </ButtonWithNotifcations>
          </ExpandingList.Button>
        )}

        {`refund status: ${status}`}

        <ExpandingList.List>
          <ExpandingList.Ul>
            {!delivered ? (
              <ExpandingList.Li onClick={handleConfirmOrder}>
                <HiOutlineCheck />
                Confirm order delivery
              </ExpandingList.Li>
            ) : status !== "refunded" ? (
              <ExpandingList.Li onClick={handleRequestRefund}>
                <HiArrowUturnLeft />
                Refund item
              </ExpandingList.Li>
            ) : null}
          </ExpandingList.Ul>
        </ExpandingList.List>
      </StyledOrderItem>
    </ExpandingList>
  );
};
