import { Content } from "../../Util/Content";
import { Stepper } from "../../Util/Stepper";
import { CardFilterGrid } from "../../Util/CardFilterGrid";
import { ProductsCard } from "../../Util/ProductsCard";
import { useCartItemsCount } from "../../hooks/cart/useCartItemsCount";
import { CartItems } from "./CartItems";
import { Column } from "../../Util/Column";
import { OrderSummary } from "./OrderSummary";
import { Button } from "../../Util/Button";
import { CouponInput } from "./CouponInput";

const itemsPerPage = import.meta.env.VITE_PRODUCTS_PER_STEPPER;

export const CartPage = () => {
  const { data, isLoading, isError } = useCartItemsCount();

  const itemCount =
    !isLoading && !isError && data?.data?.cartItems ? data.data.cartItems : 0;
  const max = itemCount ? Math.ceil(itemCount / itemsPerPage) : 1;

  return (
    <Content>
      <CardFilterGrid>
        <ProductsCard title="Shopping Cart" itemCount={itemCount}>
          <CartItems />
        </ProductsCard>

        <Column $gap="1.6rem">
          <OrderSummary />

          <CouponInput />

          <Button $color="orange" $shape="oval" $size="medium">
            Order
          </Button>
        </Column>

        <Stepper searchParamName="page" max={max} />
      </CardFilterGrid>
    </Content>
  );
};
