import { FC } from "react";
import { Row } from "../../Util/Row";
import styled from "styled-components";

const Price = styled.span`
  font-weight: 500;
`;

interface SummaryRowProps {
  name: string;
  price: string;
}

/**
 * Komponenta za prikaz vrstice povzetka naročila.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.name - Ime vrstice povzetka.
 * @param {string} props.price - Cena vrstice povzetka.
 * @returns {JSX.Element} JSX element, ki predstavlja vrstico povzetka naročila.
 *
 * @example
 * // Uporaba komponente
 * <SummaryRow name="Items" price="$50.00" />
 */

export const SummaryRow: FC<SummaryRowProps> = ({ name, price }) => {
  return (
    <Row $justifyContent="space-between">
      <span>{name}</span>
      <Price>{price}</Price>
    </Row>
  );
};
