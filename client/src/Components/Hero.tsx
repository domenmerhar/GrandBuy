import styled from "styled-components";
import { Header } from "../Util/Header";
import { Button } from "../Util/Button";
import { Countdown } from "./Time/Countdown";
import { useTranslation } from "react-i18next";

const StyledHero = styled.div`
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  height: 115vh;
  background-position: 30% 20%;
  background-size: 150%;

  display: flex;
  align-items: center;

  @media (max-width: 85em) {
    background-position: 30% 30%;
    background-size: 230%;
    height: 100vh;
  }

  @media (max-width: 60em) {
    background-position: 40% 30%;
    background-size: 240%;
  }

  @media (max-width: 45em) {
    background-position: 40% 0%;
    background-size: 270%;
    height: 80vh;
  }

  @media (max-width: 35em) {
    background-position: 45% 0%;
    background-size: 315%;
  }
`;

const ContentHolder = styled.div`
  margin: 0 auto;
  margin-bottom: 15rem;
  width: 1440px;
  padding: 32px;

  display: flex;
  flex-direction: column;

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

const ShopButton = styled(Button)`
  text-decoration: none;
`;

export const Hero = () => {
  const { t } = useTranslation();
  return (
    <StyledHero>
      <ContentHolder>
        <Header $color="white" $size="large" as="h1">
          {t("saveUpTo")} 70%
        </Header>

        <Header $color="orange" $size="small">
          {t("grandFallSale")}
        </Header>

        <Countdown />

        <ButtonHolder>
          <ShopButton
            as={"a"}
            href="#sale"
            $color="orange"
            $shape="oval"
            $size="large"
          >
            {t("shopNow")}
          </ShopButton>

          {/* <Button $color="gray" $shape="oval" $size="medium">
            Learn More
          </Button> */}
        </ButtonHolder>
      </ContentHolder>
    </StyledHero>
  );
};
