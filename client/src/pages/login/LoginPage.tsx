import styled from "styled-components";
import { Logo } from "../../Components/Logo";
import { Button } from "../../Util/Button";
import { StyledLink } from "../../Util/Link";
import { InputWithLabel } from "../../Components/InputWithLabel";
import { AuthContainer } from "../../Components/AuthContainer";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { login } from "../../api/auth/login";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
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

  & > a {
    margin: 0.6rem 0rem;
    align-self: flex-end;
  }
`;

const P = styled.p`
  align-self: center;
  font-size: 1.4rem;
`;

const toastOptions = {
  id: "login-toast",
};

/**
 * Komponenta za prijavno stran.
 *
 * @component
 * @returns {JSX.Element} JSX element, ki predstavlja prijavno stran.
 *
 * @example
 * // Uporaba komponente
 * <LoginPage />
 */

export const LoginPage = () => {
  const { t } = useTranslation();

  const { setJWT } = useAuthContext();
  const [isError, setError] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.status === "fail" || data?.errors?.length > 0) {
        toast.error(t("invalidUsernameOrPassword"), toastOptions);
        return setError(true);
      }

      setJWT(data?.token);

      toast.success(t("loggedInSuccessfully"), toastOptions);

      navigate("/");
    },
  });

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading(t("loggingIn"), toastOptions);
    mutate({
      email: String(usernameRef.current?.value),
      password: String(passwordRef.current?.value),
    });
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
          ref={usernameRef}
          error={isError}
        />

        <InputWithLabel
          id="password"
          placeholder={t("password")}
          type="password"
          title={t("password")}
          ref={passwordRef}
          error={isError}
        />

        <StyledLink $fontSize="1.4rem" to="/forgot-password">
          {t("forgotPassword")}
        </StyledLink>

        <Button $color="orange" $shape="oval" $size="medium">
          {t("login")}
        </Button>
        <P>
          {t("notAMember")}{" "}
          <StyledLink $fontSize="1.4rem" to="/signup">
            {t("signUp")}
          </StyledLink>
        </P>
      </Form>
    </AuthContainer>
  );
};
