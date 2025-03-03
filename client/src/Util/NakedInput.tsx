import styled from "styled-components";

interface NakedInputProps {
  $width?: string;
  $height?: string;
  $fontSize?: string;
  $fontWeight?: string;
}

/**
 * Komponenta za prikaz vhodnega polja brez obrobe.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} [props.$width] - Širina vhodnega polja.
 * @param {string} [props.$height] - Višina vhodnega polja.
 * @param {string} [props.$fontSize] - Velikost pisave vhodnega polja.
 * @param {string} [props.$fontWeight] - Debelina pisave vhodnega polja.
 * @returns {JSX.Element} JSX element, ki predstavlja vhodno polje brez obrobe.
 *
 * @example
 * // Uporaba komponente
 * <NakedInput $width="5rem" $height="5rem" $fontSize="1.8rem" $fontWeight="700" />
 */

export const NakedInput = styled.input<NakedInputProps>`
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: textfield;

  border: none;
  border-radius: 8px;

  width: ${({ $width }) => $width || "4rem"};
  height: ${({ $height }) => $height || "4rem"};

  text-align: center;

  font-size: ${({ $fontSize }) => $fontSize || "2rem"};
  font-weight: ${({ $fontWeight }) => $fontWeight || "500"};

  body.dark-mode & {
    background-color: var(--gray-0);
    color: var(--gray-4);
  }
`;
