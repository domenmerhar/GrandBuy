import { FC } from "react";
import styled from "styled-components";

interface LogoProps {
  $color?: "white" | "orange";
}

const LogoHolder = styled.div<LogoProps>`
  ${({ $color }) => $color === "white" && "color: var(--gray-1);"}

  ${({ $color }) =>
    $color === "orange" &&
    `background: -webkit-linear-gradient(120deg, var(--orange-4), var(--orange-6));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;`}

  font-family: "Damion", cursive;
`;

const SpanSmall = styled.span`
  font-size: 3.6rem;
`;

const SpanLarge = styled.span`
  font-size: 4.8rem;
`;

/**
 * Logo komponenta za prikaz logotipa aplikacije.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {"white" | "orange"} [props.$color] - Barva logotipa (bela ali oranžna).
 * @returns {JSX.Element} - JSX element logotipa.
 *
 * @example
 * // Uporaba komponente
 * <Logo $color="orange" />
 */

export const Logo: FC<LogoProps> = ({ $color }) => {
  return (
    <LogoHolder $color={$color}>
      <SpanSmall>Grand</SpanSmall>
      <SpanLarge>Buy</SpanLarge>
    </LogoHolder>
  );
};
