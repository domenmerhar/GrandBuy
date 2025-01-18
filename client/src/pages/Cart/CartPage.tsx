import { Content } from "../../Util/Content";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { ProductFilter } from "../../Util/ProductFilter";
import { Stepper } from "../../Util/Stepper";
import { CardFilterGrid } from "../../Util/CardFilterGrid";
import { ProductsCard } from "../../Util/ProductsCard";
import { CartItem } from "./CartItem";
import { useCartItemsCount } from "../../hooks/cart/useCartItemsCount";

const itemsPerPage = import.meta.env.VITE_PRODUCTS_PER_STEPPER;

export const CartPage = () => {
  const { data, isLoading, isError } = useCartItemsCount();

  const itemCount =
    !isLoading && !isError && data?.data?.cartItems
      ? data.data.cartItems.length
      : 0;

  const max = itemCount ? Math.ceil(itemCount / itemsPerPage) : 1;

  return (
    <Content>
      <CardFilterGrid>
        <ProductsCard title="Shopping Cart" itemCount={itemCount}>
          <CartItem />
          <CartItem />
        </ProductsCard>

        <StyledSidebar $position="sticky" $width="auto" $height="80vh">
          <ProductFilter />
        </StyledSidebar>
        <Stepper searchParamName="page" max={max} />
      </CardFilterGrid>
    </Content>
  );
};
