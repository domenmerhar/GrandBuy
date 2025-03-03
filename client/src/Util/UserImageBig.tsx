import styled from "styled-components";

/**
 * Komponenta za prikaz velike uporabniške slike.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja veliko uporabniško sliko.
 *
 * @example
 * // Uporaba komponente
 * <UserImageBig src="pot_do_slike" alt="Uporabniška slika" />
 */

export const UserImageBig = styled.img`
  height: 12.4rem;
  width: 12.4rem;
  border-radius: 50%;
`;
