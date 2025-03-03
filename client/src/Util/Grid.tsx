import styled from "styled-components";

interface GridProps {
  $minWidth: string;
  $maxWidth: string;
  $colGap: string;
  $rowGap: string;
  $margin?: string;
}

/**
 * Komponenta za prikaz mreže.
 *
 * @component
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.$minWidth - Minimalna širina stolpcev.
 * @param {string} props.$maxWidth - Maksimalna širina stolpcev.
 * @param {string} props.$colGap - Razmik med stolpci.
 * @param {string} props.$rowGap - Razmik med vrsticami.
 * @param {string} [props.$margin] - Rob okrog mreže.
 * @returns {JSX.Element} JSX element, ki predstavlja mrežo.
 *
 * @example
 * // Uporaba komponente
 * <Grid $minWidth="200px" $maxWidth="400px" $colGap="20px" $rowGap="20px" $margin="10px">
 *   <YourComponent />
 * </Grid>
 */

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ $minWidth }) => $minWidth}, ${({ $maxWidth }) => $maxWidth})
  );
  column-gap: ${({ $colGap }) => $colGap};
  row-gap: ${({ $rowGap }) => $rowGap};
  justify-content: space-around;

  ${({ $margin }) => $margin && `margin: ${$margin};`}
`;
