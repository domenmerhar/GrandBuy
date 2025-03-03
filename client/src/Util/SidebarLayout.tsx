import styled from "styled-components";

/**
 * Komponenta za prikaz stranske postavitve.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja stransko postavitev.
 *
 * @example
 * // Uporaba komponente
 * <SidebarLayout>
 *   <YourComponent />
 * </SidebarLayout>
 */

export const SidebarLayout = styled.div`
  display: flex;
  gap: 6.4rem;
  padding-right: 6.4rem;

  & > *:nth-child(3) {
    padding-top: 2.4rem;
  }

  @media (max-width: 64em) {
    padding-right: 3.2rem;
  }

  @media (max-width: 49em) {
    padding-right: 0;
  }
`;
