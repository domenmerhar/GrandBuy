import { AuthContainer } from "../../Components/AuthContainer";
import { Logo } from "../../Components/Logo";
import { useTranslation } from "react-i18next";
import { Button } from "../../Util/Button";
import styled from "styled-components";
import { Column } from "../../Util/Column";
import { InputWithLabel } from "../../Components/InputWithLabel";
import toast from "react-hot-toast";
import { useForgotPassword } from "../../hooks/auth/useForgotPassword";
import { useRef } from "react";

const Form = styled(Column)`
  & > *:first-child {
    align-self: center;
  }

  & > input {
    align-self: stretch;
    width: 100%;
  }
`;

const P = styled.p`
  max-width: 50ch;
`;

/**
 * Komponenta za stran z obrazcem za pozabljeno geslo.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja stran z obrazcem za pozabljeno geslo.
 *
 * @example
 * // Uporaba komponente
 * <ForgotPasswordPage />
 */

export default function ForgotPasswordPage() {
  const { t } = useTranslation();

  const emailRef = useRef<HTMLInputElement>(null);
  const { mutate: forgotPassword } = useForgotPassword(
    emailRef.current?.value || ""
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailString = emailRef.current?.value;

    if (!emailString || !RegExp(/^\S+@\S+\.\S+$/).test(emailString))
      return toast.error(t("pleaseEnterEmail"), { id: "forgot-password" });

    forgotPassword({ email: emailString });
  };

  return (
    <AuthContainer>
      <Form as="form" $gap="1.2rem" onSubmit={handleSubmit}>
        <Logo $color="orange" />
        <P>{t("pleaseEnterEmail")}</P>
        <div>
          <InputWithLabel
            id="email"
            title={t("email")}
            placeholder={t("email")}
            ref={emailRef}
          />
        </div>

        <Button $color="orange" $shape="oval" $size="medium">
          {t("confirm")}
        </Button>
      </Form>
    </AuthContainer>
  );
}
