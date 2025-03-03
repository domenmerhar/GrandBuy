import { FC } from "react";
import { UserIcon } from "../../Util/ProfileIcon";
import { Row } from "../../Util/Row";

interface UsernameIconProps {
  username: string;
  icon: string;
}

/**
 * Komponenta za prikaz uporabniškega imena in ikone.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.username - Uporabniško ime.
 * @param {string} props.icon - URL ikone uporabnika.
 * @returns {JSX.Element} JSX element, ki predstavlja uporabniško ime in ikono.
 *
 * @example
 * // Uporaba komponente
 * <UsernameIcon username="JaneDoe" icon="https://example.com/icon.jpg" />
 */

export const UsernameIcon: FC<UsernameIconProps> = ({ username, icon }) => {
  return (
    <Row $alignItems="center" $gap=".8rem">
      <UserIcon src={icon} />
      {username}
    </Row>
  );
};
