import styled from "styled-components";
import { Row } from "../../Util/Row";
import { FC, useEffect, useState } from "react";
import { Column } from "../../Util/Column";
import { StepperRaw } from "../../Components/Button/StepperRaw";
import { useAuthContext } from "../../contexts/AuthContext";
import { useIncrementCartItem } from "../../hooks/cart/useIncrementCartItem";
import { useDecrementCartItem } from "../../hooks/cart/useDecrementCartItem";
import { useDeleteCartItem } from "../../hooks/cart/useDeleteCartItem";
import { Link, useSearchParams } from "react-router-dom";
import { CartItemButton } from "./CartItemButton";
import { useUpdateCartItemQuantity } from "../../hooks/cart/useUpdateCartItemQuantity";
import { DeleteButton } from "../../Components/Button/DeleteButton";

const Image = styled.img`
  width: 14rem;
  height: 14rem;
`;

const ProductInfoHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonHolder = styled(Column)`
  margin-left: auto;
`;

const Product = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--gray-7);
`;

const Price = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--gray-8);
`;

interface CartItemProps {
  cartItemId: string;
  productId: string;
  image: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
}

/**
 * Komponenta za prikazovanje posameznega artikla v košarici.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.cartItemId - ID artikla v košarici.
 * @param {string} props.productId - ID izdelka.
 * @param {string} props.image - URL slike izdelka.
 * @param {string} props.name - Ime izdelka.
 * @param {string} props.description - Opis izdelka.
 * @param {string} props.price - Cena izdelka.
 * @param {number} props.quantity - Količina artikla v košarici.
 * @returns {JSX.Element} JSX element, ki predstavlja posamezni artikel v košarici.
 *
 * @example
 * // Uporaba komponente
 * <CartItem
 *   cartItemId="123"
 *   productId="456"
 *   image="https://example.com/image.jpg"
 *   name="Izdelek"
 *   description="Opis izdelka"
 *   price="10.99"
 *   quantity={1}
 * />
 */

export const CartItem: FC<CartItemProps> = ({
  cartItemId,
  productId,
  image,
  name,
  price,
  quantity,
}) => {
  const [quantityState, setQuantityState] = useState<number>(quantity);
  const [searchParams, setSearchParams] = useSearchParams();

  const { JWT } = useAuthContext();
  const { mutate: increment } = useIncrementCartItem();
  const { mutate: decrement } = useDecrementCartItem();
  const { mutate: deleteItem } = useDeleteCartItem();
  const { mutate: updateCartItemQuantity } = useUpdateCartItemQuantity();

  const handlePreviousPage = () => decrement({ JWT, cartItemId });
  const handleNextPage = () => increment({ JWT, cartItemId });
  const handleDelete = () => {
    if (searchParams.get("products")?.includes(cartItemId)) {
      const products = searchParams.get("products");
      const newProducts = products
        ?.split(",")
        ?.filter((id) => id !== cartItemId);

      setSearchParams((prev) => {
        if (!newProducts || newProducts?.length === 0) prev.delete("products");
        else prev.set("products", newProducts.join(","));
        return prev;
      });
    }
    deleteItem({ JWT, cartItemId });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantityState(Number(e.target.value));
  };

  const handleBlur = () => {
    if (quantity === quantityState) return;
    updateCartItemQuantity({
      JWT,
      cartItemId,
      quantity: quantityState,
    });
  };

  useEffect(() => {
    setQuantityState(quantity);
  }, [quantity, setQuantityState]);

  return (
    <Row $gap="2rem">
      <CartItemButton cartItemId={cartItemId} />

      <Link to={`/product/${productId}?quantity=1&page=1&sort=-likesCount`}>
        <Image src={image} />
      </Link>

      <ProductInfoHolder>
        <Product>{name}</Product>
        <Price>{price}</Price>
      </ProductInfoHolder>

      <ButtonHolder $alignItems="flex-end" $justifyContent="space-around">
        <DeleteButton handleDelete={handleDelete} size="small" />

        <StepperRaw
          color="orange"
          placeholder={String(quantity)}
          min={0}
          currentStep={quantityState}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          disabledLeft={quantity === 1}
          handleBlurPage={handleBlur}
          handleChangePage={handleChange}
        />
      </ButtonHolder>
    </Row>
  );
};
