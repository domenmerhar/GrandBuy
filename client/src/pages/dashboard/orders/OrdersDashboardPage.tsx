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
import { useTranslation } from "react-i18next";

const itemsPerPage = import.meta.env.VITE_SELLER_ORDERS_PER_PAGE;

export const OrdersDashboardPage = () => {
  const { t } = useTranslation();

  const { data } = useGetSellerOrderedItems();
  const { data: dataPendingOrders } = usePendingOrders();

  const pendingOrders = dataPendingOrders?.totalCount || "N/A";

  const max = Math.ceil((data?.totalCount || 1) / itemsPerPage);

  const filterOptions = [
    { value: "all", name: t("all") },
    { value: "pending", name: t("pending") },
    { value: "shipped", name: t("shipped") },
    { value: "cancelled", name: t("cancelled") },
    { value: "delivered", name: t("delivered") },
  ];

  const selectOptions = [
    { value: "oldest", name: t("sortByDateOldest") },
    { value: "newest", name: t("sortByDateNewest") },
  ];

  return (
    <>
      <FilterSortHeader
        headerText={t("orders")}
        filterOptions={filterOptions}
        selectOptions={selectOptions}
      />

      <Row>
        <OverviewCard
          icon={<BiPackage />}
          title={t("pendingOrders")}
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
