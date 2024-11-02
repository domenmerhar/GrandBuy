import { Link } from "react-router-dom";
import styled from "styled-components";

interface StyledLinkProps {
  $fontSize: string;
}

export const StyledLink = styled(Link)<StyledLinkProps>`
  color: var(--orange-5);
  font-size: ${({ $fontSize }) => $fontSize};

  align-self: flex-end;
`;
