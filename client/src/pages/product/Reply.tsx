import styled from "styled-components";
import { Column } from "../../Util/Column";
import { UsernameIcon } from "./UsernameIcon";
import { FC } from "react";

const StyledReply = styled(Column)`
  margin-left: 2rem;
  margin-top: -8px;
`;

interface ReplyProps {
  username: string;
  icon: string;
  content: string;
}

/**
 * Komponenta za prikaz odgovora na mnenje.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.username - Uporabniško ime avtorja odgovora.
 * @param {string} props.icon - URL ikone uporabnika.
 * @param {string} props.content - Vsebina odgovora.
 * @returns {JSX.Element} JSX element, ki predstavlja odgovor na mnenje.
 *
 * @example
 * // Uporaba komponente
 * <Reply username="JaneDoe" icon="https://example.com/icon.jpg" content="Hvala za povratne informacije!" />
 */

export const Reply: FC<ReplyProps> = ({ username, icon, content }) => {
  return (
    <StyledReply $gap="8px">
      <UsernameIcon username={username} icon={icon} />
      <p>{content}</p>
    </StyledReply>
  );
};
