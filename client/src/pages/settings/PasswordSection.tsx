import { FormEvent, useRef } from "react";
import { Button } from "../../Util/Button";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { SettingsForm } from "./SettingsForm";
import toast from "react-hot-toast";
import { useChangePassword } from "../../hooks/useChangePassword";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

export const PasswordSection = () => {
  const { t } = useTranslation();

  const { JWT } = useAuthContext();
  const { mutate } = useChangePassword();
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!passwordRef.current?.value || !confirmPasswordRef.current?.value)
      return toast.error(t("pleaseEnterAllFields"), {
        id: "changePassword",
      });

    if (passwordRef.current.value !== confirmPasswordRef.current.value)
      return toast.error(t("passwordsDontMatch"), { id: "changePassword" });

    mutate({
      JWT,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    });
  };

  return (
    <SettingsForm onSubmit={handleSubmit}>
      <HeaderUppercaseBold as="h2">{t("password")}</HeaderUppercaseBold>

      <InputWithLabel
        id="password"
        title={t("password")}
        type="password"
        placeholder="********"
        ref={passwordRef}
      />

      <InputWithLabel
        id="confirm-password"
        title={t("confirmPassword")}
        type="password"
        placeholder="********"
        ref={confirmPasswordRef}
      />

      <Button $color="orange" $shape="rectangle" $size="medium">
        {t("changePassword")}
      </Button>
    </SettingsForm>
  );
};
