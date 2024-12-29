import { Table } from "../../../Components/Table";
import { Button } from "../../../Util/Button";
import { Badge } from "../../../Util/Badge";
import { Modal } from "../../../Util/Modal";
import { useSearchParams } from "react-router-dom";
import { FC } from "react";
import { IOrderTable, OrderStatus } from "../../../Util/types";

const headers = ["Username", "Quantity", "Product", "Status", ""];

interface OrdersTableProps {
  data: IOrderTable[];
}

export const OrdersTable: FC<OrdersTableProps> = ({ data }) => {
  const { setIsOpen } = Modal.useModalContext();
  const [, setSearchParams] = useSearchParams();

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
          <Badge $color="green" $size="small">
            Shipped
          </Badge>
        );

      case "cancelled":
        return (
          <Badge $color="red" $size="small">
            Cancelled
          </Badge>
        );

      case "pending":
        return "Pending";
    }
  };

  return (
    <Table headers={headers}>
      {data.map(({ username, orderID, quantity, product, status }) => (
        <Table.Row key={orderID}>
          <td>{username}</td>
          <td>{quantity}</td>
          <td>{product}</td>
          <td>{renderBadge(status)}</td>

          <td>
            {status === "pending" ? (
              <Button
                $color="orange"
                $shape="oval"
                $size="small"
                onClick={handleClick(orderID)}
              >
                Respond
              </Button>
            ) : null}
          </td>
        </Table.Row>
      ))}
    </Table>
  );
};
