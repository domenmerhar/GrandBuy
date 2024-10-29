import styled from "styled-components";

interface GridProps {
  $minWidth: string;
  $maxWidth: string;
  $colGap: string;
  $rowGap: string;
  $margin?: string;
}

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
