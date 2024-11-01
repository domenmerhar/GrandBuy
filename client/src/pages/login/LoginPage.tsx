import styled from "styled-components";

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
  background-color: var(--gray-4);
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

export const LoginPage = () => {
  return (
    <>
      <LoginContainer />
      <ContentHolder></ContentHolder>
      <BackgroundImage />
    </>
  );
};
