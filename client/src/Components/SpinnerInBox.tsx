import { FC } from "react";
import styled from "styled-components";
import { Spinner } from "../Util/Spinner";

interface SpinnerInBoxProps {
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  fullPage?: boolean;
}

interface SpinnerProps {
  $fullPage?: boolean;
}

const StyledSpinnerInBox = styled.div<SpinnerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $fullPage }) => ($fullPage ? "80dvh" : "100%")};
`;

export const SpinnerInBox: FC<SpinnerInBoxProps> = ({
  size = "large",
  isLoading = true,
  fullPage = true,
}) => {
  if (!isLoading) return null;

  return (
    <StyledSpinnerInBox $fullPage={fullPage}>
      <Spinner $size={size} />
    </StyledSpinnerInBox>
  );
};
