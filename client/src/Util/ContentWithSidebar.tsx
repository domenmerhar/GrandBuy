import styled from "styled-components";

/**
 * Komponenta za prikaz vsebine s stransko vrstico.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja vsebino s stransko vrstico.
 *
 * @example
 * // Uporaba komponente
 * <ContentWithSidebar>
 *   <YourComponent />
 * </ContentWithSidebar>
 */

export const ContentWithSidebar = styled.div`
  max-width: 126rem;
  display: flex;
  flex: 1;
  flex-direction: column;

  & > select {
    align-self: flex-end;
  }
`;
