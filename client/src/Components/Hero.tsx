import styled from "styled-components";
import { Header } from "../Util/Header";
import { Button } from "../Util/Button";
import { Countdown } from "./Countdown";

const StyledHero = styled.div`
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  height: 95vh;
  background-position: 0% 50%;
  background-size: 120%;

  @media (max-width: 75em) {
    background-position: 0% 0%;
    background-size: 160%;
  }

  @media (max-width: 60em) {
    background-position: 40% 0%;
    background-size: 200%;
  }

  @media (max-width: 45em) {
    background-position: 40% 25%;
    background-size: 250%;
  }

  @media (max-width: 35em) {
    background-position: 45% 0%;
    background-size: 315%;
  }
`;

const ContentHolder = styled.div`
  position: absolute;
  top: 40%;
  left: 6%;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;

  & > *:nth-child(2) {
    //margin-top: -0.8rem;
  }

  & > *:nth-child(3) {
    margin-top: 3.2rem;
  }

  & > *:last-child {
    margin-top: 3.2rem;
  }
`;

const ButtonHolder = styled.div`
  display: flex;
  gap: 1.6rem;
`;

export const Hero = () => {
  return (
    <StyledHero>
      <ContentHolder>
        <Header $color="white" $size="large" as="h1">
          Save up to 70%
        </Header>

        <Header $color="orange" $size="small">
          Grand Fall Sale
        </Header>

        <Countdown />

        <ButtonHolder>
          <Button $color="orange" $shape="oval">
            Shop Now
          </Button>

          <Button $color="gray" $shape="oval">
            Learn More
          </Button>
        </ButtonHolder>
      </ContentHolder>
    </StyledHero>
  );
};
