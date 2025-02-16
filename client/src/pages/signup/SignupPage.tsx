import styled from "styled-components";
import { Logo } from "../../Util/Logo";
import { Button } from "../../Util/Button";
import { StyledLink } from "../../Util/Link";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { AuthContainer } from "../../Util/AuthContainer";
import { useSignup } from "../../hooks/useSignup";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 35rem;
  gap: 0.4rem;

  & > *:first-child {
    align-self: center;
  }

  & > label {
    margin-top: 0.8rem;
  }

  & > button {
    margin-top: 1.2rem;
  }

  & > a {
    margin: 0.6rem 0rem;
    align-self: flex-end;
  }
`;

const P = styled.p`
  align-self: center;
  font-size: 1.4rem;
`;

export const SignupPage = () => {
  const { t } = useTranslation();
  const { mutate } = useSignup();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const username = (e.currentTarget.elements[1] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[2] as HTMLInputElement).value;
    const confirmPassword = (e.currentTarget.elements[3] as HTMLInputElement)
      .value;

    if (!email || !username || !password || !confirmPassword)
      return toast.error("Please fill in all fields.", { id: "signup" });

    if (password !== confirmPassword)
      return toast.error("Passwords don't match.", { id: "signup" });

    mutate({ email, username, password, confirmPassword });
  };

  return (
    <AuthContainer>
      <Form onSubmit={handleSubmit}>
        <Logo $color="orange" />

        <InputWithLabel
          id="email"
          placeholder={t("email")}
          type="text"
          title={t("email")}
        />
        <InputWithLabel
          id="username"
          placeholder={t("username")}
          type="text"
          title={t("username")}
        />
        <InputWithLabel
          id="password"
          placeholder={t("password")}
          type="password"
          title={t("password")}
        />
        <InputWithLabel
          id="confirmPassword"
          placeholder={t("confirmPassword")}
          type="password"
          title={t("confirmPassword")}
        />

        <Button $color="orange" $shape="oval" $size="medium">
          {t("signup")}
        </Button>
        <P>
          {t("alreadyAMember")}{" "}
          <StyledLink $fontSize="1.4rem" to="/login">
            {t("login")}
          </StyledLink>
        </P>
      </Form>
    </AuthContainer>
  );
};
