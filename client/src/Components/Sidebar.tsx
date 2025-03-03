import styled from "styled-components";
import { FC, ReactNode } from "react";
import { StyledSidebar } from "../Util/StyledSidebar";

interface SidebarProps {
  children: ReactNode | ReactNode[];
}

const Placeholder = styled.div`
  display: inline-block;
  min-width: 20rem;
  width: 32rem;
  height: 100vh;

  @media (max-width: 64em) {
    max-width: 40rem;
  }

  @media (max-width: 49em) {
    max-width: 20rem;
  }
`;

/**
 * Sidebar komponenta za prikaz stranske vrstice.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {ReactNode | ReactNode[]} props.children - Vsebina stranske vrstice.
 * @returns {JSX.Element} - JSX element stranske vrstice.
 *
 * @example
 * // Uporaba komponente
 * <Sidebar>
 * <p>Vsebina stranske vrstice</p>
 * <button>Gumb</button>
 * </Sidebar>
 */

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  return (
    <>
      <StyledSidebar $position="fixed">{children}</StyledSidebar>
      <Placeholder />
    </>
  );
};
