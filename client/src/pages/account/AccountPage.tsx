import { Outlet } from "react-router-dom";
import { Column } from "../../Util/Column";
import { Content } from "../../Util/Content";
import { UserInfo } from "./UserInfo";

/**
 * AccountPage komponenta za prikaz strani računa uporabnika.
 *
 * Ta komponenta prikazuje informacije o uporabniku (UserInfo) in vsebino otroških poti (Outlet).
 *
 * @returns {JSX.Element} - JSX element, ki predstavlja stran računa.
 *
 * @example
 * // Uporaba komponente
 * <AccountPage />
 */

export const AccountPage = () => {
  return (
    <Content>
      <Column $alignItems="center" $gap="32px">
        <UserInfo />

        <Outlet />
      </Column>
    </Content>
  );
};
