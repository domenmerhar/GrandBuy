import styled from "styled-components";
import { Logo } from "../../Util/Logo";
import { Button } from "../../Util/Button";
import { StyledLink } from "../../Util/Link";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { AuthContainer } from "../../Util/AuthContainer";
import { useNavigate } from "react-router-dom";

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

export const LoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/");
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
        />
        <InputWithLabel
          id="password"
          placeholder="Password"
          type="password"
          title="Password"
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
