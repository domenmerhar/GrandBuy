import { Column } from "../../Util/Column";
import { Content } from "../../Util/Content";
import { Modal } from "../../Util/Modal";
import { LanguageSection } from "./LanguageSection";
import { RoleSection } from "./RoleSection";
import { PasswordSection } from "./PasswordSection";
import { AccountSection } from "./AccountSection";
import { useMe } from "../../hooks/useMe";
import UserImageWithModal from "./UserImageWithModal";

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
