import styled from "styled-components";

interface SpinnerProps {
  $size: "small" | "medium" | "large";
}

export const Spinner = styled.div<SpinnerProps>`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  width: ${({ $size }) => {
    if ($size === "small") return "3.2rem";
    if ($size === "medium") return "6.4rem";
    if ($size === "large") return "12.8rem";
  }};

  height: ${({ $size }) => {
    if ($size === "small") return "3.2rem";
    if ($size === "medium") return "6.4rem";
    if ($size === "large") return "12.8rem";
  }};

  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: var(--orange-6);

  animation: spin 1s linear infinite;
`;
