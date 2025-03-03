import styled from "styled-components";
import { Logo } from "../../Components/Logo";
import { Button } from "../../Util/Button";
import { AuthContainer } from "../../Util/AuthContainer";
import { NakedInput } from "../../Util/NakedInput";
import { useState } from "react";
import toast from "react-hot-toast";
import { useConfirmEmail } from "../../hooks/auth/useConfirmEmail";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

export const SignupConfirmPage = () => {
  const { t } = useTranslation();
  const { email } = useParams<{ email: string }>();

  const [code, setCode] = useState<string>("");
  const { mutate } = useConfirmEmail();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.slice(0, 9));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const verificationCode = (e?.currentTarget.elements[0] as HTMLInputElement)
      ?.value;
    if (!verificationCode)
      return toast.error(t("pleaseEnterAllFields"), { id: "confirmEmail" });

    mutate({ email: email!, verificationCode });
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

        <Button $color="orange" $shape="oval" $size="medium">
          {t("confirm")}
        </Button>
      </Form>
    </AuthContainer>
  );
};
