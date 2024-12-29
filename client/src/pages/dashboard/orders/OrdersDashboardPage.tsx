import { FilterSortHeader } from "../../../Util/FilterSortHeader";
import { Stepper } from "../../../Util/Stepper";
import { OverviewCard } from "../../../Components/OverviewCard";
import { Row } from "../../../Util/Row";
import { BiPackage } from "react-icons/bi";
import { Modal } from "../../../Util/Modal";
import { OrdersTable } from "./OrdersTable";
import { IOrderTable } from "../../../Util/types";
import { OrderRespondModal } from "./OrderRespondModal";

const filterOptions = [
  { value: "all", name: "All" },
  { value: "pending", name: "Pending" },
  { value: "shipped", name: "Shipped" },
  { value: "cancelled", name: "Cancelled" },
  { value: "delivered", name: "Delivered" },
];

const selectOptions = [
  { value: "all", name: "All" },
  { value: "oldest", name: "Sort by age (oldest)" },
  { value: "newest", name: "Sort by age (newest)" },
];

const tableData: IOrderTable[] = [
  {
    orderID: "1",
    username: "User 1",
    product: "Product 1",
    quantity: 1,
    status: "pending",
  },
  {
    orderID: "2",
    username: "User 2",
    product: "Product 2",
    quantity: 2,
    status: "shipped",
  },
  {
    orderID: "3",
    username: "User 3",
    product: "Product 3",
    quantity: 3,
    status: "cancelled",
  },
];

export const OrdersDashboardPage = () => {
  return (
    <>
      <FilterSortHeader
        headerText="Orders"
        filterOptions={filterOptions}
        selectOptions={selectOptions}
      />

      <Row>
        <OverviewCard
          icon={<BiPackage />}
          title="Pending orders"
          content="234"
        />
      </Row>

      <Modal>
        <OrdersTable data={tableData} />

        <OrderRespondModal />
      </Modal>

      <Stepper searchParamName="page" />
    </>
  );
};
