import { Column } from "../../Util/Column";
import { Content } from "../../Util/Content";
import { Modal } from "../../Components/Modal";
import { LanguageSection } from "./LanguageSection";
import { RoleSection } from "./RoleSection";
import { PasswordSection } from "./PasswordSection";
import { AccountSection } from "./AccountSection";
import { useMe } from "../../hooks/useMe";
import UserImageWithModal from "./UserImageWithModal";

/**
 * Komponenta za prikaz strani z nastavitvami.
 *
 * @component
 * @returns {JSX.Element} JSX element, ki predstavlja stran z nastavitvami.
 *
 * @example
 * // Uporaba komponente
 * <SettingsPage />
 */

export const SettingsPage = () => {
  const { data } = useMe();

  const role = data?.data?.role;

  return (
    <Content>
      <Column $alignItems="center" $gap="36px">
        <Modal>
          <UserImageWithModal />
        </Modal>

        <AccountSection />

        <PasswordSection />

        {role === "user" && (
          <Modal>
            <RoleSection />
          </Modal>
        )}
        <LanguageSection />
      </Column>
    </Content>
  );
};
