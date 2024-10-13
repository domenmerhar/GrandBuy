import styled from "styled-components";

const StyledHero = styled.div`
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

export const Hero = () => {
  return <StyledHero>Hero</StyledHero>;
};