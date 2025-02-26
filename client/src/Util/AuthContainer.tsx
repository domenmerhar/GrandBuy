import { FC } from "react";
import styled from "styled-components";
import { ThemeLanguageRow } from "../Components/ThemeLanguageRow";

interface AuthContainerProps {
  children: React.ReactNode | React.ReactNode[];
}

const BackgroundImage = styled.div`
  background-image: url("/src/public/shopping-bag.jpg");
  width: 100vw;
  height: 100vh;

  background-position: 30% 50%;
  background-size: 150%;

  @media (max-width: 79em) {
    background-size: 180%;
    background-position: 25% 50%;
  }

  @media (max-width: 65em) {
    background-size: 200%;
    background-position: 30% 50%;
  }

  @media (max-width: 49em) {
    display: none;
  }
`;

const SkewedBackground = styled.div`
  background-color: var(--gray-3);
  height: 100vh;
  width: 60vw;
  left: -300px;
  z-index: 1;
  position: fixed;

  transform: skew(-20deg);

  @media (max-width: 85em) {
    width: 75vw;
    left: -225px;
  }

  @media (max-width: 65em) {
    width: 85vw;
  }

  @media (max-width: 49em) {
    height: 100vh;
    width: 100vw;
    transform: skew(0deg);
    left: 0;
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

  @media (max-width: 49em) {
    width: 100vw;
  }
`;

export const AuthContainer: FC<AuthContainerProps> = ({ children }) => {
  return (
    <>
      <SkewedBackground />
      <ContentHolder>{children}</ContentHolder>
      <BackgroundImage />
      <ThemeLanguageRow />
    </>
  );
};
