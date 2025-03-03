import styled from "styled-components";

interface StyledSidebarProps {
  $position: string;
  $rounded?: boolean;
  $width?: string;
  $height?: string;
}

/**
 * Komponenta za prikaz stranskega stranskega stolpca.
 *
 * @component
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.$position - Pozicija stranskega stolpca.
 * @param {boolean} [props.$rounded] - Ali je stranski stolpec z zaobljenimi robovi.
 * @param {string} [props.$width] - Širina stranskega stolpca.
 * @param {string} [props.$height] - Višina stranskega stolpca.
 * @returns {JSX.Element} JSX element, ki predstavlja stranski stolpec.
 *
 * @example
 * // Uporaba komponente
 * <StyledSidebar $position="fixed" $rounded={true} $width="40rem" $height="100vh">
 *   <YourComponent />
 * </StyledSidebar>
 */

export const StyledSidebar = styled.aside<StyledSidebarProps>`
  position: ${({ $position }) => $position};
  display: inline-block;
  width: ${({ $width }) => $width || "32rem"};
  height: ${({ $height }) => $height || "100vh"};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 2.4rem 3.2rem;

  ${({ $rounded }) => $rounded && "border-radius: 15px;"}

  @media (max-width: 64em) {
    max-width: 40rem;
  }

  @media (max-width: 49em) {
    max-width: 22rem;
  }
`;
