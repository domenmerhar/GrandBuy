import styled from "styled-components";
import { RowColumnProps } from "./types";

export const Row = styled.div<RowColumnProps>`
  display: flex;

  ${({ $gap }) => $gap && `gap: ${$gap};`}

  ${({ $justifyContent }) =>
    $justifyContent && `justify-content: ${$justifyContent};`}

  ${({ $alignItems }) => $alignItems && `align-items: ${$alignItems};`}

  ${({ $flexWrap }) => $flexWrap && `flex-wrap: ${$flexWrap};`}
`;
