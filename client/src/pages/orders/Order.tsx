import { FC } from "react";
import { BadgeColor, IOrder, OrderProduct } from "../../Util/types";
import { OrderItem } from "./OrderItem";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { toPrice } from "../../functions/toPrice";
import { Row } from "../../Util/Row";
import { toDate } from "../../functions/toDate";
import { Badge } from "../../Util/Badge";
import styled from "styled-components";
import { Column } from "../../Util/Column";

const UppercaseBold = styled.span`
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--gray-7);
`;

const RowInfo = styled(Row)`
  margin: 0.4rem 0;
`;

export const Order: FC<IOrder> = ({
  _id,
  estimatedDelivery,
  deliveredAt,
  status,
  products,
  totalPrice,
  createdAt,
}) => {
  let color: BadgeColor;

  switch (status) {
    case "pending":
    case "shipped":
      color = "yellow";
      break;

    case "cancelled":
      color = "red";
      break;

    case "delivered":
      color = "green";
      break;
  }

  return (
    <>
      <RowInfo $justifyContent="space-between" $alignItems="center">
        <Row $alignItems="center" $gap="3.2rem">
          <Column>
            <UppercaseBold>Est. Delivery</UppercaseBold>
            {toDate(estimatedDelivery)}
          </Column>

          {deliveredAt ? (
            <Column>
              <UppercaseBold>Delivered</UppercaseBold>
              {toDate(deliveredAt)}
            </Column>
          ) : null}
        </Row>

        <Badge $color={color} $size="medium">
          {status}
        </Badge>
      </RowInfo>

      {products.map(
        ({ _id, product, image, name, quantity, totalPrice }: OrderProduct) => (
          <OrderItem
            key={_id}
            productId={product}
            image={toApiFilesPath(image)}
            name={name}
            quantity={quantity}
            price={toPrice(totalPrice, "USD")}
          />
        )
      )}

      <RowInfo $justifyContent="space-between" $alignItems="center">
        <Column>
          <UppercaseBold>Ordered</UppercaseBold>
          {toDate(createdAt)}
        </Column>

        <Column>
          <UppercaseBold>Total</UppercaseBold>
          {toPrice(totalPrice, "USD")}
        </Column>
      </RowInfo>
    </>
  );
};
