import styled from "styled-components";

interface SquareButtonProps {
  $color: "orange" | "red" | "white";
  $size: "large" | "medium" | "small";
}

export const SquareButton = styled.button<SquareButtonProps>`
  ${({ $color }) =>
    $color === "orange" &&
    "background-image: linear-gradient(120deg, var(--orange-6), var(--orange-5));"}

  color: ${({ $color }) => ($color === "red" ? "var(--red)" : "var(--gray-3)")};

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--gray-0);

  border: none;
  border-radius: 1rem;

  width: ${({ $size }) =>
    $size === "large" ? "5.4rem" : $size === "medium" ? "4.8rem" : "3.6rem"};
  height: ${({ $size }) =>
    $size === "large" ? "5.4rem" : $size === "medium" ? "4.8rem" : "3.6rem"};

  transition: all 200ms;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    color: var(--gray-7);
  }
`;
