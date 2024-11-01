import styled from "styled-components";
import { Logo } from "../../Util/Logo";

const BackgroundImage = styled.div`
  background-image: url("/src/public/shopping-bag.jpg");
  width: 100vw;
  height: 100vh;

  background-position: 0% 50%;
  background-size: 130%;

  @media (max-width: 79em) {
    background-size: 160%;
    background-position: 25% 50%;
  }

  @media (max-width: 65em) {
    background-size: 200%;
    background-position: 30% 50%;
  }
`;

const LoginContainer = styled.div`
  background-color: var(--gray-3);
  height: 100vh;
  width: 60vw;
  left: -200px;
  z-index: 1;
  position: fixed;

  transform: skew(-20deg);

  @media (max-width: 79em) {
    width: 65vw;
  }

  @media (max-width: 65em) {
    width: 75vw;
  }
`;

const ContentHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50vw;

  height: 100vh;
  position: fixed;
  z-index: 3;

  position: fixed;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > *:first-child {
    align-self: center;
  }
`;

const Input = styled.input`
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 12px;

  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  background-color: var(--gray-2);

  transition: all 200ms;

  color: var(--gray-8);

  font-size: 1.6rem;

  &::placeholder {
    color: var(--gray-6);
  }

  &:focus {
    outline: none;
    background-color: var(--gray-0);
  }

  &[type="password"] {
    font-variant: small-caption;

    &::placeholder {
      font-variant: normal;
    }
  }
`;

const Label = styled.label`
  color: var(--gray-6);
  font-weight: 500;

  font-size: 1.6rem;
`;

export const LoginPage = () => {
  return (
    <>
      <LoginContainer />
      <ContentHolder>
        <Form>
          <Logo $color="orange" />

          <Label htmlFor="username">Username</Label>
          <Input type="text" placeholder="Username" id="username" />

          <Label htmlFor="password">Password</Label>
          <Input type="password" placeholder="Password" id="password" />
        </Form>
      </ContentHolder>
      <BackgroundImage />
    </>
  );
};
