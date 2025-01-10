import styled from "styled-components";
import { Logo } from "../../Util/Logo";
import { Button } from "../../Util/Button";
import { StyledLink } from "../../Util/Link";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { AuthContainer } from "../../Util/AuthContainer";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { login } from "../../api/login";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

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

export const LoginPage = () => {
  const [, setAuth] = useAuthContext();
  const [isError, setError] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.status === "fail" || data?.errors?.length > 0) {
        toast.error("Invalid username or password", toastOptions);
        return setError(true);
      }

      setAuth({
        userId: data?.data?.user?._id,
        username: data?.data?.user?.username,
        JWT: data?.token,
        role: data?.data?.user?.role,
      });

      toast.success("Logged in successfully", toastOptions);

      navigate("/");
    },
  });

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Logging in...", toastOptions);
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
          id="username"
          placeholder="Username"
          type="text"
          title="Username"
          ref={usernameRef}
          error={isError}
        />

        <InputWithLabel
          id="password"
          placeholder="Password"
          type="password"
          title="Password"
          ref={passwordRef}
          error={isError}
        />

        <StyledLink $fontSize="1.4rem" to="/forgot-password">
          Forgot password?
        </StyledLink>

        <Button $color="orange" $shape="oval" $size="medium">
          Login
        </Button>
        <P>
          Not a member?{" "}
          <StyledLink $fontSize="1.4rem" to="/signup">
            Sign up
          </StyledLink>
        </P>
      </Form>
    </AuthContainer>
  );
};
