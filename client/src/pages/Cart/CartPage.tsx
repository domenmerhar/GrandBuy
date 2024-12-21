import { Content } from "../../Util/Content";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { ProductFilter } from "../../Util/ProductFilter";
import { Stepper } from "../../Util/Stepper";
import { CardFilterGrid } from "../../Util/CardFilterGrid";
import { ProductsCard } from "../../Util/ProductsCard";
import { CartItem } from "./CartItem";

export const CartPage = () => {
  return (
    <Content>
      <CardFilterGrid>
        <ProductsCard title="Shopping Cart" itemCount={2}>
          <CartItem />
          <CartItem />
        </ProductsCard>

        <StyledSidebar $position="sticky" $width="auto" $height="80vh">
          <ProductFilter />
        </StyledSidebar>
        <Stepper searchParamName="page" max={10} />
      </CardFilterGrid>
    </Content>
  );
};
