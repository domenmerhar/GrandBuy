import styled from "styled-components";

interface HeaderProps {
  $color: "orange" | "white";
  $size: "large" | "medium" | "small";
}

export const Header = styled.h1<HeaderProps>`
  ${({ $color }) =>
    $color === "orange" &&
    `background: -webkit-linear-gradient(120deg, var(--orange-4), var(--orange-6));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;`}

  ${({ $color }) => $color === "white" && `color: var(--gray-light-0);`}


  font-size: ${({ $size }) =>
    $size === "large" ? "6.4rem" : $size === "medium" ? "4.8rem" : "3.2rem"};
  font-weight: 800;
  letter-spacing: 1px;
`;
