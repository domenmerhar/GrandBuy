import styled from "styled-components";
import { Logo } from "../../Components/Logo";
import { Button } from "../../Util/Button";
import { AuthContainer } from "../../Components/AuthContainer";
import { NakedInput } from "../../Util/NakedInput";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useConfirmForgotPassword } from "../../hooks/auth/useConfirmForgotPassword";
import { InputWithLabel } from "../../Components/InputWithLabel";
import { Column } from "../../Util/Column";

const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 35rem;
  gap: 1.2rem;

  & > *:first-child {
    align-self: center;
  }

  & > input {
    width: 100%;
  }

  & > label {
    margin-top: 0.8rem;
  }

  & > button {
    margin-top: 1.2rem;
  }
`;

const P = styled.p`
  max-width: 50ch;
`;

/**
 * Komponenta za potrjevanje pozabljenega gesla.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki omogoča uporabniku potrjevanje pozabljenega gesla.
 *
 * @example
 * // Uporaba komponente
 * <ConfirmForgotPasswordPage />
 */

export const ConfirmForgotPasswordPage = () => {
  const { t } = useTranslation();
  const { email } = useParams<{ email: string }>();

  const [code, setCode] = useState<string>("");
  const { mutate: confirmForgotPassword } = useConfirmForgotPassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.slice(0, 9));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const verificationCode = (e?.currentTarget.elements[0] as HTMLInputElement)
      ?.valueAsNumber;
    const password = (e?.currentTarget.elements[1] as HTMLInputElement)?.value;
    const confirmPassword = (e?.currentTarget.elements[2] as HTMLInputElement)
      ?.value;

    if (
      !verificationCode ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    )
      return toast.error(t("pleaseEnterAllFields"), { id: "forgot-password" });

    confirmForgotPassword({
      email: email!,
      verificationCode,
      password,
      confirmPassword,
    });
  };

  return (
    <AuthContainer>
      <Form onSubmit={handleSubmit}>
        <Logo $color="orange" />
        <P>{t("pleaseEnterVerificationCode")}</P>

        <NakedInput
          placeholder="12345678"
          $height="3.6rem"
          type="number"
          max={999999999}
          min={111111111}
          maxLength={9}
          onChange={handleChange}
          value={code}
        />

        <Column>
          <InputWithLabel id="password" title={t("password")} type="password" />
        </Column>

        <Column>
          <InputWithLabel
            id="confirmPassword"
            title={t("confirmPassword")}
            type="password"
          />
        </Column>

        <Button $color="orange" $shape="oval" $size="medium">
          {t("confirm")}
        </Button>
      </Form>
    </AuthContainer>
  );
};
