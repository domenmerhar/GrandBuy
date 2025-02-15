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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
            <UppercaseBold>{t("estimatedDelivery")}</UppercaseBold>
            {toDate(estimatedDelivery)}
          </Column>

          {deliveredAt ? (
            <Column>
              <UppercaseBold>{t("delivered")}</UppercaseBold>
              {toDate(deliveredAt)}
            </Column>
          ) : null}
        </Row>

        <Badge $color={color} $size="medium">
          {t(status)}
        </Badge>
      </RowInfo>

      {products.map(
        ({
          _id: cartItemId,
          product,
          image,
          name,
          quantity,
          totalPrice,
          status,
        }: OrderProduct) => (
          <OrderItem
            orderId={_id}
            cartItemId={cartItemId}
            key={cartItemId}
            productId={product}
            image={toApiFilesPath(image)}
            name={name}
            quantity={quantity}
            price={toPrice(totalPrice, "USD")}
            status={status}
            delivered={status === "delivered"}
          />
        )
      )}

      <RowInfo $justifyContent="space-between" $alignItems="center">
        <Column>
          <UppercaseBold>{t("ordered")}</UppercaseBold>
          {toDate(createdAt)}
        </Column>

        <Column>
          <UppercaseBold>{t("total")}</UppercaseBold>
          {toPrice(totalPrice, "USD")}
        </Column>
      </RowInfo>
    </>
  );
};
