import styled from "styled-components";

interface CircleButtonProps {
  $active: boolean;
}

export const CircleButton = styled.button<CircleButtonProps>`
  width: 3.2rem;
  height: 3.2rem;

  border: 1px solid var(--orange-6);
  border-radius: 50%;

  background-color: transparent;

  ${({ $active }) =>
    $active &&
    "background-image: linear-gradient(45deg, var(--orange-6), var(--orange-5))"};
`;
