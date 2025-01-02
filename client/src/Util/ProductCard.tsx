import { FC } from "react";
import styled from "styled-components";
import { AddButton } from "./AddButton";
import { Link } from "react-router-dom";
import { ProductCardProps } from "./types";
import { toPrice } from "../functions/toPrice";
import { Discount } from "./Discount";

const StyledProductCard = styled(Link)`
  &:link,
  &:visited {
    text-decoration: none;
    color: var(--gray-8);
    background-color: var(--gray-1);
    border-radius: 12px;
    position: relative;

    width: 30rem;
    padding: 2.4rem;

    display: flex;
    gap: 0.8rem;
    align-items: start;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    transition: all 200ms ease-in;
  }

  &:hover,
  &:active {
    transform: translateY(-2px);
    cursor: pointer;
  }

  @media (max-width: 82em) {
    width: 28rem;
    padding: 2rem;
  }
`;

const ImageHolder = styled.div`
  height: 24rem;
  overflow: hidden;
  display: flex;
  align-self: center;

  @media (max-width: 82em) {
    height: 22rem;
  }
`;

const Image = styled.img`
  width: 30rem;
  overflow: hidden;
  color: transparent;

  @media (max-width: 82em) {
    width: 27rem;
  }
`;

const Title = styled.h3`
  width: 100%;
  font-weight: 500;
  font-size: 1.6rem;
  height: 1.2em;
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Price = styled.p`
  color: var(--gray-8);
  font-size: 3.2rem;
  font-weight: 600;
`;

const PriceButtonHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const ProductCard: FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  discount,
}) => {
  return (
    <StyledProductCard to={`/product/${id}?quantity=1&page=1&sort=-likesCount`}>
      <ImageHolder>
        <Image src={image} alt={title} />
      </ImageHolder>

      {discount && discount > 0 ? <Discount>-{discount}%</Discount> : null}
      <Title>{title}</Title>

      <PriceButtonHolder>
        <Price>{toPrice(price, "USD")}</Price>
        <AddButton />
      </PriceButtonHolder>
    </StyledProductCard>
  );
};
