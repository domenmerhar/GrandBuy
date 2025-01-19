import { CardFilterGrid } from "../../Util/CardFilterGrid";
import { Content } from "../../Util/Content";
import { ProductFilter } from "../../Util/ProductFilter";
import { ProductsCard } from "../../Util/ProductsCard";
import { Stepper } from "../../Util/Stepper";
import { CartItem } from "../Cart/CartItem";
import { StyledSidebar } from "../../Util/StyledSidebar";

export const OrdersPage = () => {
  return (
    <Content>
      <CardFilterGrid>
        <ProductsCard title="Orders" itemCount={2}>
          <CartItem />
        </ProductsCard>

        <StyledSidebar $position="sticky" $width="auto" $height="80vh">
          <ProductFilter freeShipping price sale />
        </StyledSidebar>
        <Stepper searchParamName="page" max={10} />
      </CardFilterGrid>
    </Content>
  );
};
