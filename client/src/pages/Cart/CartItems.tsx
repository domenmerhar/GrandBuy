import { useCartItems } from "../../hooks/cart/useCartItems";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { CartItemInterface } from "../../Util/types";
import { toPrice } from "../../functions/toPrice";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { CartItem } from "./CartItem";

export const CartItems = () => {
  const { data, isLoading, error } = useCartItems();

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  return data?.data?.cartItems?.map(
    ({
      _id,
      image,
      name,
      totalPrice,
      quantity,
      product,
    }: CartItemInterface) => (
      <CartItem
        image={toApiFilesPath(image)}
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat animi nam aperiam earum explicabo ratione reiciendis, vel, a veritatis voluptatum molestias quaerat cumque, aut natus deleniti architecto iusto fugiat dignissimos."
        name={name}
        price={toPrice(totalPrice, "USD")}
        quantity={quantity}
        key={_id}
        productId={product}
        cartItemId={_id}
      />
    )
  );
};
