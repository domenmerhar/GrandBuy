import { FC } from "react";
import styled from "styled-components";

const Em = styled.em`
  font-style: normal;
  font-weight: 500;
`;

interface ProductInfoParagraphProps {
  title: string;
  value: string;
}

/**
 * Komponenta za prikaz informacij o izdelku.
 *
 * @component
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.title - Naslov informacije.
 * @param {string} props.value - Vrednost informacije.
 * @returns {JSX.Element} JSX element, ki predstavlja informacije o izdelku.
 *
 * @example
 * // Uporaba komponente
 * <ProductInfoParagraph title="Cena" value="$100" />
 */

export const ProductInfoParagraph: FC<ProductInfoParagraphProps> = ({
  title,
  value,
}) => {
  return (
    <p>
      {title}: <Em>{value}</Em>
    </p>
  );
};
