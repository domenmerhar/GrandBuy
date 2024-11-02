import styled from "styled-components";
import { Logo } from "../../Util/Logo";
import { Button } from "../../Util/Button";
import { StyledLink } from "../../Util/Link";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { AuthContainer } from "../../Util/AuthContainer";

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
  return (
    <AuthContainer>
      <Form>
        <Logo $color="orange" />

        <InputWithLabel
          id="email"
          placeholder="Email"
          type="text"
          title="Email"
        />
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
        <InputWithLabel
          id="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          title="Confirm Password"
        />

        <Button $color="orange" $shape="oval" $size="medium">
          Login
        </Button>
        <P>
          Already a member?{" "}
          <StyledLink $fontSize="1.4rem" to="/register">
            Login
          </StyledLink>
        </P>
      </Form>
    </AuthContainer>
  );
};
