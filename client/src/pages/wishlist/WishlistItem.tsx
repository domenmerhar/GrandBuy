import styled from "styled-components";
import { AddButton } from "../../Util/AddButton";
import { Row } from "../../Util/Row";
import { FC } from "react";

const Image = styled.img`
  width: 14rem;
  height: 14rem;
`;

const ProductInfoHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & + button {
    margin-left: auto;
  }
`;

const Product = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--gray-7);
`;

const Description = styled.p`
  max-width: 50ch;
  font-size: 1.4rem;

  text-overflow: ellipsis;
`;

const Price = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--gray-8);
`;

interface CartItemProps {
  image: string;
  name: string;
  description: string;
  price: string;
  productId: string;
}

export const WishlistItem: FC<CartItemProps> = ({
  image,
  name,
  description,
  price,
  productId,
}) => {
  return (
    <Row $gap="2rem">
      <Image src={image} />
      <ProductInfoHolder>
        <Product>{name}</Product>
        <Description>{description}</Description>
        <Price>{price}</Price>
      </ProductInfoHolder>
      <AddButton productId={productId} />
    </Row>
  );
};
