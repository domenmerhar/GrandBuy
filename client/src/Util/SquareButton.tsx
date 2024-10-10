import styled from "styled-components";

interface SquareButtonProps {
  $color: "orange" | "red" | "white";
  $size: "medium" | "small";
}

export const SquareButton = styled.button<SquareButtonProps>`
  ${({ $color }) =>
    $color === "orange" &&
    "background-image: linear-gradient(120deg, var(--orange-6), var(--orange-5));"}

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--gray-0);

  border: none;
  border-radius: 1rem;

  width: ${({ $size }) => ($size === "medium" ? "4.8rem" : "3.2rem")};
  height: ${({ $size }) => ($size === "medium" ? "4.8rem" : "3.2rem")};

  transition: all 200ms;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;
