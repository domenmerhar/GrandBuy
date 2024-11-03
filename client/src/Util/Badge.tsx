import styled from "styled-components";

interface BadgeProps {
  $color: "orange" | "red" | "green" | "yellow";
}

export const Badge = styled.span<BadgeProps>`
  ${({ $color }) =>
    $color === "orange" &&
    "background-image: linear-gradient(120deg, var(--orange-6), var(--orange-5));"}

  ${({ $color }) => $color === "red" && "background-color: var(--red);"}

  ${({ $color }) => $color === "green" && "background-color: var(--green-6);"}

  ${({ $color }) => $color === "yellow" && "background-color: var(--yellow);"}

  color: var(--gray-0);
  text-transform: uppercase;
  font-weight: ${({ $color }) => ($color === "red" ? 600 : 500)};
  letter-spacing: 0.2px;

  padding: 0.6rem 0.9rem;

  border-radius: 2rem;
`;
