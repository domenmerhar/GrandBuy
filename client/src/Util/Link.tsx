import { Link } from "react-router-dom";
import styled from "styled-components";

interface StyledLinkProps {
  $fontSize: string;
}

/**
 * Komponenta za prikaz oblikovane povezave.
 *
 * @component
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.$fontSize - Velikost pisave povezave.
 * @returns {JSX.Element} JSX element, ki predstavlja oblikovano povezavo.
 *
 * @example
 * // Uporaba komponente
 * <StyledLink to="/home" $fontSize="1.6rem">Domov</StyledLink>
 */

export const StyledLink = styled(Link)<StyledLinkProps>`
  color: var(--orange-5);
  font-size: ${({ $fontSize }) => $fontSize};
`;
