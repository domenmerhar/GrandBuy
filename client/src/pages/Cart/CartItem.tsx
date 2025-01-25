import styled from "styled-components";
import { Row } from "../../Util/Row";
import { FC, useEffect, useState } from "react";
import { Column } from "../../Util/Column";
import { SquareButton } from "../../Util/SquareButton";
import { HiOutlineTrash } from "react-icons/hi";
import { StepperRaw } from "../../Util/StepperRaw";
import { useAuthContext } from "../../contexts/AuthContext";
import { useIncrementCartItem } from "../../hooks/cart/useIncrementCartItem";
import { useDecrementCartItem } from "../../hooks/cart/useDecrementCartItem";
import { useDeleteCartItem } from "../../hooks/cart/useDeleteCartItem";
import { useUpdateCartItemQuantity } from "../../hooks/cart/useupdateCartItemQuantity";
import { Link } from "react-router-dom";

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

export const CartItem: FC<CartItemProps> = ({
  cartItemId,
  productId,
  image,
  name,
  price,
  quantity,
}) => {
  const [quantityState, setQuantityState] = useState<number>(quantity);

  const [{ JWT }] = useAuthContext();
  const { mutate: increment } = useIncrementCartItem();
  const { mutate: decrement } = useDecrementCartItem();
  const { mutate: deleteItem } = useDeleteCartItem();
  const { mutate: updateCartItemQuantity } = useUpdateCartItemQuantity();

  const handlePreviousPage = () => decrement({ JWT, cartItemId });
  const handleNextPage = () => increment({ JWT, cartItemId });
  const handleDelete = () => deleteItem({ JWT, cartItemId });

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
      <Link to={`/product/${productId}?quantity=1&page=1&sort=-likesCount`}>
        <Image src={image} />
      </Link>

      <ProductInfoHolder>
        <Product>{name}</Product>
        <Price>{price}</Price>
      </ProductInfoHolder>

      <ButtonHolder $alignItems="flex-end" $justifyContent="space-around">
        <SquareButton $color="red" $size="small">
          <HiOutlineTrash onClick={handleDelete} />
        </SquareButton>

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
