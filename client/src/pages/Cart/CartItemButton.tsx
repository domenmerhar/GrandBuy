import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { CircleButton } from "../../Util/CircleButton";

const AlignedCircleButton = styled(CircleButton)`
  align-self: center;
`;

interface CartItemButtonProps {
  cartItemId: string;
}

/**
 * Komponenta za prikazovanje gumba za izdelek v košarici.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.cartItemId - ID artikla v košarici.
 * @returns {JSX.Element} JSX element, ki predstavlja gumb za izdelek v košarici.
 *
 * @example
 * // Uporaba komponente
 * <CartItemButton cartItemId="123" />
 */

export const CartItemButton: FC<CartItemButtonProps> = ({ cartItemId }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCirlceButton = () => {
    const products = searchParams.get("products");

    if (!products)
      return setSearchParams((prev) => {
        prev.append("products", cartItemId);
        return prev;
      });

    if (!products.includes(cartItemId))
      return setSearchParams((prev) => {
        prev.set("products", `${products},${cartItemId}`);
        return prev;
      });

    const newProducts = products.split(",").filter((id) => id !== cartItemId);
    setSearchParams((prev) => {
      if (newProducts.length === 0) prev.delete("products");
      else prev.set("products", newProducts.join(","));

      return prev;
    });
  };

  return (
    <AlignedCircleButton
      $active={Boolean(searchParams.get("products")?.includes(cartItemId))}
      onClick={handleCirlceButton}
    />
  );
};
