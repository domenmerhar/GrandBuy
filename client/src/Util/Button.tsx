import styled from "styled-components";

interface ButtonProps {
  $shape: "rectangle" | "oval";
  $color: "orange" | "gray";
}

export const Button = styled.button<ButtonProps>`
  ${({ $color }) =>
    $color === "orange" &&
    "background-image: linear-gradient(120deg, var(--orange-6), var(--orange-5));"}

  ${({ $color }) => $color === "gray" && "background-color: var(--gray-3);"};

  color: ${({ $color }) =>
    $color === "orange" ? "var(--gray-0)" : "var(--orange-5)"};

  border: none;
  border-radius: ${({ $shape }) =>
    $shape === "rectangle" ? "1rem" : "1000rem"};

  padding: ${({ $shape }) =>
    $shape === "rectangle" ? "1rem 1.5rem" : "1.2rem 1.7rem"};

  font-size: 1.8rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;

  transition: all 200ms;

  &:hover {
    ${({ $color }) =>
      $color === "orange" &&
      "background-image: linear-gradient(120deg, var(--orange-7), var(--orange-6));"}

    ${({ $color }) => $color === "gray" && "background-color: var(--gray-4);"}

    transform: scale(1.05) translateY(-2px);
  }

  &:active {
    transform: scale(1);
  }
`;
