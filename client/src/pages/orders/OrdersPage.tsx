import { CardFilterGrid } from "../../Util/CardFilterGrid";
import { Content } from "../../Util/Content";
import { ProductFilter } from "../../Util/ProductFilter";
import { ProductsCard } from "../../Util/ProductsCard";
import { Stepper } from "../../Util/Stepper";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { useGetUserOrdersCount } from "../../hooks/order/useGetUserOrdersCount";
import { Orders } from "./Orders";

const itemsPerPage = import.meta.env.VITE_ORDERS_PER_PAGE;

export const OrdersPage = () => {
  const { data } = useGetUserOrdersCount();

  const itemCount = data?.data?.ordersCount || 0;
  const max = itemCount ? Math.ceil(itemCount / itemsPerPage) : 1;

  return (
    <Content>
      <CardFilterGrid>
        <ProductsCard title="Orders" itemCount={itemCount}>
          <Orders />
        </ProductsCard>

        <StyledSidebar $position="sticky" $width="auto" $height="80vh">
          <ProductFilter freeShipping price sale />
        </StyledSidebar>
        <Stepper searchParamName="page" max={max} />
      </CardFilterGrid>
    </Content>
  );
};
