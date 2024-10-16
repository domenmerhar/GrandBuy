import { FC } from "react";
import styled from "styled-components";
import { SquareButton } from "./SquareButton";
import { HiPlus } from "react-icons/hi";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image?: string;
  discount?: number;
}

const StyledProductCard = styled.div`
  background-color: var(--gray-1);
  width: 27rem;
  border-end-end-radius: 8px;
  position: relative;
  padding: 1.6rem;

  display: flex;
  gap: 0.8rem;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  transition: all 200ms ease-in;

  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
  }
`;

const Discount = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: -25px;
  top: -25px;

  background-color: var(--red);
  color: var(--gray-0);

  rotate: 30deg;
  height: 5rem;
  width: 5rem;
  border-radius: 50px;

  font-weight: 600;
`;

const ImageHolder = styled.div`
  height: 22rem;
  overflow: hidden;
  display: flex;
  align-self: center;
`;

const Image = styled.img`
  width: 27rem;
  overflow: hidden;
`;

const Title = styled.h3`
  width: 95%;
  color: var(--gray-8);
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
  margin-right: 1.5rem;
`;

export const ProductCard: FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  discount,
}) => {
  return (
    <StyledProductCard>
      <ImageHolder>
        <Image src={image} alt={title} />
      </ImageHolder>

      {discount && <Discount>-{discount}%</Discount>}
      <Title>{title}</Title>

      <PriceButtonHolder>
        <Price>${price}</Price>
        <SquareButton $size="small" $color="orange">
          <HiPlus color="#f8f9fa" size={24} />
        </SquareButton>
      </PriceButtonHolder>
    </StyledProductCard>
  );
};
