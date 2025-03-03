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
import { useConfirmOrder } from "../../hooks/order/useConfirmOrderDelivery";
import ExpandingList from "../../Components/ExpandingList";
import { HiOutlineCheck } from "react-icons/hi";
import { useJWT } from "../../hooks/useJWT";
import ExpandingThreeDotsButton from "../../Components/ExpandingThreeDotsButton";

const UppercaseBold = styled.span`
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--gray-7);
`;

const RowInfo = styled(Row)`
  margin: 0.4rem 0;
`;

/**
 * Komponenta za prikaz naročila.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props._id - ID naročila.
 * @param {string} props.estimatedDelivery - Ocenjeni datum dostave.
 * @param {string} props.deliveredAt - Datum dostave.
 * @param {string} props.status - Status naročila.
 * @param {Array} props.products - Seznam izdelkov v naročilu.
 * @param {number} props.totalPrice - Skupna cena naročila.
 * @param {string} props.createdAt - Datum ustvaritve naročila.
 * @returns {JSX.Element} JSX element, ki predstavlja naročilo.
 *
 * @example
 * // Uporaba komponente
 * <Order
 *   _id="1"
 *   estimatedDelivery="2025-04-10"
 *   deliveredAt="2025-04-12"
 *   status="delivered"
 *   products={[{ _id: "123", product: "456", image: "url", name: "Izdelek", quantity: 1, totalPrice: 100, status: "delivered" }]}
 *   totalPrice={100}
 *   createdAt="2025-03-30"
 * />
 */

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

  const { JWT } = useJWT();

  const { mutate: confirmOrder } = useConfirmOrder();
  const handleConfirmOrder = () => confirmOrder({ JWT, orderId: _id });

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
        <Column>
          <UppercaseBold>{t("estimatedDelivery")}</UppercaseBold>
          {toDate(estimatedDelivery)}
        </Column>

        <Row $alignItems="center" $gap="1.6rem">
          {deliveredAt ? (
            <Column>
              <UppercaseBold>{t("delivered")}</UppercaseBold>
              {toDate(deliveredAt)}
            </Column>
          ) : null}

          {status === "shipped" ? (
            <ExpandingList start="right">
              <ExpandingThreeDotsButton />

              <ExpandingList.List>
                <ExpandingList.Ul>
                  <ExpandingList.Li onClick={handleConfirmOrder}>
                    <HiOutlineCheck />
                    {t("confirmOrderDelivery")}
                  </ExpandingList.Li>
                </ExpandingList.Ul>
              </ExpandingList.List>
            </ExpandingList>
          ) : null}

          {status !== "delivered" ? (
            <Badge $color={color} $size="medium">
              {t(status)}
            </Badge>
          ) : null}
        </Row>
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
