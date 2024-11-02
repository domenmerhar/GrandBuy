import styled from "styled-components";
import { RowColumnProps } from "./types";

export const Column = styled.div<RowColumnProps>`
  display: flex;
  flex-direction: column;

  ${({ $gap }) => $gap && `gap: ${$gap};`}

  ${({ $justifyContent }) =>
    $justifyContent && `justify-content: ${$justifyContent};`}

  ${({ $alignItems }) => $alignItems && `align-items: ${$alignItems};`}
`;
