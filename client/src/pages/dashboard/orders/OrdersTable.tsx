import { Table } from "../../../Components/Table";
import { Button } from "../../../Util/Button";
import { Badge } from "../../../Util/Badge";
import { Modal } from "../../../Util/Modal";
import { useSearchParams } from "react-router-dom";
import { ISellerOrder, OrderStatus } from "../../../Util/types";
import { useGetSellerOrderedItems } from "../../../hooks/order/useGetSellerOrderedItems";
import { SpinnerInBox } from "../../../Components/SpinnerInBox";
import { ErrorBox } from "../../../Components/ErrorBox";
import { useTranslation } from "react-i18next";

export const OrdersTable = () => {
  const { t } = useTranslation();
  const headers = [t("products"), t("quantity"), t("total"), t("status"), ""];

  const { setIsOpen } = Modal.useModalContext();
  const [, setSearchParams] = useSearchParams();
  const { data, isLoading, error } = useGetSellerOrderedItems();

  const handleClick = (orderId: string) => () => {
    setSearchParams((searchParams) => {
      searchParams.set("orderId", orderId);
      return searchParams;
    });

    setIsOpen(true);
  };

  const renderBadge = (status: OrderStatus) => {
    switch (status) {
      case "shipped":
        return (
          <Badge $color="yellow" $size="small">
            {t(status)}
          </Badge>
        );

      case "cancelled":
        return (
          <Badge $color="red" $size="small">
            {t(status)}
          </Badge>
        );

      case "delivered":
        return (
          <Badge $color="green" $size="small">
            {t(status)}
          </Badge>
        );

      case "pending":
        return t(status);
    }
  };

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <Table headers={headers}>
      {data?.data?.map(
        ({
          _id,
          product: { name },
          quantity,
          status,
          price,
          discount,
        }: ISellerOrder) => (
          <Table.Row key={_id}>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{(quantity * price * (100 - discount)) / 100}</td>
            <td>{renderBadge(status)}</td>

            <td>
              {status === "pending" ? (
                <Button
                  $color="orange"
                  $shape="oval"
                  $size="small"
                  onClick={handleClick(_id)}
                >
                  Respond
                </Button>
              ) : null}
            </td>
          </Table.Row>
        )
      )}
    </Table>
  );
};
