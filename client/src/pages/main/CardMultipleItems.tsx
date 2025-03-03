import styled from "styled-components";
import { Header } from "../../Util/Header";
import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

const StyledCardMultipleItem = styled.div`
  border-radius: 12px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  background-color: var(--gray-2);
  display: inline-block;
  padding: 1.6rem 2.4rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-top: 1.6rem;
`;

const Product = styled(NavLink)`
  &:visited,
  &:link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
    position: relative;
    text-decoration: none;
    color: var(--gray-7);
  }
`;

const Image = styled.img`
  width: 180px;
`;

const Price = styled.span`
  font-size: 2.4rem;
  color: var(--red);
  font-weight: 600;
  margin-right: 3.2rem;
`;

const PreviousPrice = styled.span`
  font-size: 1.4rem;
  position: absolute;
  bottom: 15px;
  right: 10px;
  text-decoration: line-through var(--gray-8);
`;

/**
 * Komponenta za prikaz več izdelkov na kartici.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {ReactNode[]} props.children - Otroški elementi (komponente izdelkov).
 * @param {string} props.title - Naslov kartice.
 * @returns {JSX.Element} JSX element, ki predstavlja kartico z več izdelki.
 *
 * @example
 * // Uporaba komponente
 * <CardMultipleItems title="Priporočeni izdelki">
 *   <CardMultipleItems.Product
 *     id="123"
 *     productName="Izdelek 1"
 *     imageSrc="https://example.com/image1.jpg"
 *     priceBeforeDiscount="€100"
 *     priceAfterDiscount="€80"
 *   />
 *   <CardMultipleItems.Product
 *     id="456"
 *     productName="Izdelek 2"
 *     imageSrc="https://example.com/image2.jpg"
 *     priceBeforeDiscount="€150"
 *     priceAfterDiscount="€120"
 *   />
 * </CardMultipleItems>
 */

interface ProductProps {
  id: string;
  productName: string;
  imageSrc: string;
  priceBeforeDiscount: string;
  priceAfterDiscount: string;
}

export const CardMultipleItems: FC<{
  children: ReactNode[];
  title: string;
}> & {
  Product: FC<ProductProps>;
} = ({ title, children }) => {
  return (
    <StyledCardMultipleItem>
      <Header $color="orange" $size="small" as="h3">
        {title}
      </Header>

      <Row>{children}</Row>
    </StyledCardMultipleItem>
  );
};

interface ProductProps {
  id: string;
  productName: string;
  imageSrc: string;
  priceBeforeDiscount: string;
  priceAfterDiscount: string;
}

CardMultipleItems.Product = ({
  id,
  productName,
  imageSrc,
  priceBeforeDiscount,
  priceAfterDiscount,
}) => {
  return (
    <Product to={`/product/${id}?quantity=1&page=1&sort=-likesCount`}>
      <Image src={imageSrc} alt={productName} />
      <Price>{priceAfterDiscount}</Price>
      <PreviousPrice>{priceBeforeDiscount}</PreviousPrice>
    </Product>
  );
};
