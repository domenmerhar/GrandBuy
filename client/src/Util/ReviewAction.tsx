import styled from "styled-components";
import { Row } from "./Row";

interface ReviewActionProps {
  $active?: boolean;
}

export const ReviewAction = styled(Row)<ReviewActionProps>`
  background: transparent;
  border: none;
  text-transform: uppercase;

  transition: all 200ms;

  ${({ $active }) => $active && `color: var(--orange-6);`}

  &:hover {
    color: var(--gray-9);
  }
`;
