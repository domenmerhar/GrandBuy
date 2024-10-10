import styled from "styled-components";

const LogoHolder = styled.div`
  color: var(--gray-0);
  font-family: "Damion", cursive;
  background-color: var(--orange-5);
`;

const SpanSmall = styled.span`
  font-size: 3.6rem;
`;

const SpanLarge = styled.span`
  font-size: 4.8rem;
`;

export const Logo = () => {
  return (
    <LogoHolder>
      <SpanSmall>Grand</SpanSmall>
      <SpanLarge>Buy</SpanLarge>
    </LogoHolder>
  );
};
