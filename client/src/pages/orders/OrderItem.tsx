import styled from "styled-components";
import { Row } from "../../Util/Row";
import { AddButton } from "../../Util/AddButton";
import { Link } from "react-router-dom";
import { FC } from "react";

const Image = styled.img`
  width: 14rem;
  height: 14rem;
`;

const ProductInfoHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  & + button {
    margin-left: auto;
  }
`;

const Product = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--gray-7);
  margin-bottom: 3.2rem;
`;

const Price = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--gray-8);
`;

const Quantity = styled.p``;

interface CartItemProps {
  image: string;
  name: string;
  price: string;
  productId: string;
  quantity: number;
}

export const OrderItem: FC<CartItemProps> = ({
  image,
  name,
  price,
  productId,
  quantity,
}) => {
  return (
    <Row $gap="2rem">
      <Link to={`/product/${productId}?quantity=1&page=1&sort=-likesCount`}>
        <Image src={image} />
      </Link>

      <ProductInfoHolder>
        <Product>{name}</Product>

        <Price>Total price: {price}</Price>
        <Quantity>Quantity: {quantity}</Quantity>
      </ProductInfoHolder>

      <AddButton productId={productId} />
    </Row>
  );
};
