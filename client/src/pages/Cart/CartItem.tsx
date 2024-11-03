import styled from "styled-components";
import { AddButton } from "../../Util/AddButton";
import { Row } from "../../Util/Row";

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

export const CartItem = () => {
  return (
    <Row $gap="2rem">
      <Image src="https://via.placeholder.com/140" />
      <ProductInfoHolder>
        <Product>Product Name</Product>
        <Description>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod aliquam
          ut laudantium, illum distinctio dolorum aliquid? Excepturi,
          praesentium, sint culpa eaque reprehenderit dolorum, impedit quisquam
          nobis minima quas facilis voluptate!
        </Description>
        <Price>$100.00</Price>
      </ProductInfoHolder>
      <AddButton />
    </Row>
  );
};
