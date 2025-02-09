import { FilterSortHeader } from "../../../Util/FilterSortHeader";
import { Stepper } from "../../../Util/Stepper";
import { OverviewCard } from "../../../Components/OverviewCard";
import { Row } from "../../../Util/Row";
import { BiPackage } from "react-icons/bi";
import { Modal } from "../../../Util/Modal";
import { OrdersTable } from "./OrdersTable";
import { OrderRespondModal } from "./OrderRespondModal";
import { useGetSellerOrderedItems } from "../../../hooks/order/useGetSellerOrderedItems";
import { usePendingOrders } from "../../../hooks/order/usePendingOrders";

const itemsPerPage = import.meta.env.VITE_SELLER_ORDERS_PER_PAGE;

const filterOptions = [
  { value: "all", name: "All" },
  { value: "pending", name: "Pending" },
  { value: "shipped", name: "Shipped" },
  { value: "cancelled", name: "Cancelled" },
  { value: "delivered", name: "Delivered" },
];

const selectOptions = [
  { value: "newest", name: "Sort by age (newest)" },
  { value: "oldest", name: "Sort by age (oldest)" },
];

export const OrdersDashboardPage = () => {
  const { data } = useGetSellerOrderedItems();
  const { data: dataPendingOrders } = usePendingOrders();

  const pendingOrders = dataPendingOrders?.totalCount || "N/A";

  const max = Math.ceil((data?.totalCount || 1) / itemsPerPage);

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
          content={pendingOrders}
        />
      </Row>

      <Modal>
        <OrdersTable />

        <OrderRespondModal />
      </Modal>

      <Stepper searchParamName="page" max={max} />
    </>
  );
};
