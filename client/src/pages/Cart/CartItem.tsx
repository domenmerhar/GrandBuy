import styled from "styled-components";
import { Row } from "../../Util/Row";
import { FC } from "react";
import { Column } from "../../Util/Column";
import { SquareButton } from "../../Util/SquareButton";
import { HiOutlineTrash } from "react-icons/hi";
import { StepperRaw } from "../../Util/StepperRaw";
import { useAddProductToCard } from "../../hooks/cart/useAddProductToCard";
import { useAuthContext } from "../../contexts/AuthContext";

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
  productId: string;
  image: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
}

export const CartItem: FC<CartItemProps> = ({
  productId,
  image,
  name,
  description,
  price,
  quantity,
}) => {
  const [{ JWT }] = useAuthContext();
  const { mutate, isPending } = useAddProductToCard();

  return (
    <Row $gap="2rem">
      <Image src={image} />
      <ProductInfoHolder>
        <Product>{name}</Product>
        <Price>{price}</Price>
      </ProductInfoHolder>

      <ButtonHolder $alignItems="flex-end" $justifyContent="space-around">
        <SquareButton $color="red" $size="small">
          <HiOutlineTrash />
        </SquareButton>

        <StepperRaw
          color="orange"
          placeholder={String(quantity)}
          min={0}
          handleNextPage={() =>
            mutate({ JWT, productId, quantity: quantity + 1 })
          }
          disabledLeft={isPending}
          disabledInput
          disabledRight={isPending}
        />
      </ButtonHolder>
    </Row>
  );
};
