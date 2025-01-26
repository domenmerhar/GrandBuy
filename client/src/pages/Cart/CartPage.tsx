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
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddOrder } from "../../hooks/order/useAddOrder";
import { useAuthContext } from "../../contexts/AuthContext";

const itemsPerPage = import.meta.env.VITE_PRODUCTS_PER_STEPPER;

export const CartPage = () => {
  const { data, isLoading, isError } = useCartItemsCount();
  const [{ JWT }] = useAuthContext();
  const [searchParams] = useSearchParams();
  const { mutate } = useAddOrder();

  const itemCount =
    !isLoading && !isError && data?.data?.cartItems ? data.data.cartItems : 0;
  const max = itemCount ? Math.ceil(itemCount / itemsPerPage) : 1;

  const handleOrder = () => {
    const cartItems = searchParams.get("products")?.split(",");

    if (!cartItems?.length)
      return toast.error("Please add items to cart first", { id: "add-order" });

    mutate({ JWT, cartItems });
  };

  return (
    <Content>
      <CardFilterGrid>
        <ProductsCard title="Shopping Cart" itemCount={itemCount}>
          <CartItems />
        </ProductsCard>

        <Column $gap="1.6rem">
          <OrderSummary />

          <CouponInput />

          <Button
            $color="orange"
            $shape="oval"
            $size="medium"
            onClick={handleOrder}
          >
            Order
          </Button>
        </Column>

        <Stepper searchParamName="page" max={max} />
      </CardFilterGrid>
    </Content>
  );
};
