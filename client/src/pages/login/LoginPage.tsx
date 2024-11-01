import styled from "styled-components";

const BackgroundImage = styled.div`
  background-image: url("/src/public/shopping-bag.jpg");
  width: 100vw;
  height: 100vh;

  background-position: 0% 50%;
  background-size: 130%;
`;

const LoginContainer = styled.div`
  background-color: var(--gray-4);
  height: 100vh;
  width: 60vw;
  left: -200px;
  z-index: 1;
  position: fixed;

  transform: skew(-20deg);
`;

export const LoginPage = () => {
  return (
    <>
      <LoginContainer></LoginContainer>
      <BackgroundImage />
    </>
  );
};
