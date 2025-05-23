import { useTranslation } from "react-i18next";
import { Content } from "../../Util/Content";
import { ProductsCard } from "../../Components/Card/ProductsCard";
import { Stepper } from "../../Components/Stepper";
import { useGetUserOrdersCount } from "../../hooks/order/useGetUserOrdersCount";
import { Orders } from "./Orders";
import styled from "styled-components";
import { Modal } from "../../Components/Modal";
import { RefundModal } from "../refund/RefundModal";

const itemsPerPage = import.meta.env.VITE_ORDERS_PER_PAGE;

const StyledOrdersPage = styled(Content)`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3.2rem;

  & > :last-child {
    margin-top: auto;
  }
`;

/**
 * Komponenta za prikaz strani z naročili.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja stran z naročili.
 *
 * @example
 * // Uporaba komponente
 * <OrdersPage />
 */

export const OrdersPage = () => {
  const { t } = useTranslation();

  const { data } = useGetUserOrdersCount();

  const itemCount = data?.data?.ordersCount || 0;
  const max = itemCount ? Math.ceil(itemCount / itemsPerPage) : 1;

  return (
    <StyledOrdersPage>
      <Modal>
        <ProductsCard title={t("orders")} itemCount={itemCount}>
          <Orders />
        </ProductsCard>

        <RefundModal />
      </Modal>

      <Stepper searchParamName="page" max={max} />
    </StyledOrdersPage>
  );
};
