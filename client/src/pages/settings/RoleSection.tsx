import { FormEvent } from "react";
import { Button } from "../../Util/Button";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { Modal } from "../../Util/Modal";
import { SettingsForm } from "./SettingsForm";
import { useMe } from "../../hooks/useMe";
import { UserSettings } from "../../Util/types";
import { useRequestSeller } from "../../hooks/useRequestSeller";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

export const RoleSection = () => {
  const { t } = useTranslation();

  const { setIsOpen } = Modal.useModalContext();
  const { data }: { data: { data: UserSettings } } = useMe();

  const { JWT } = useAuthContext();
  const { mutate } = useRequestSeller();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleModal = () => mutate(JWT);

  return (
    <>
      <SettingsForm onSubmit={handleSubmit}>
        <HeaderUppercaseBold as="h2">{t("role")}</HeaderUppercaseBold>

        <InputWithLabel
          id="role"
          title={t("role")}
          type="text"
          placeholder={data?.data?.role}
          disabled={true}
        />

        <Button $color="orange" $shape="rectangle" $size="medium">
          {t("requestSeller")}
        </Button>
      </SettingsForm>

      <Modal.Window
        title={t("requestSeller")}
        positiveButton={{
          text: t("submit"),
          color: "green",
          onClick: handleModal,
        }}
      >
        {t("areYouSureYouWontBeAbleToRevertThisDecision")}
      </Modal.Window>
    </>
  );
};
