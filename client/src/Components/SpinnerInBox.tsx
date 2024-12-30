import { FC } from "react";
import styled from "styled-components";
import { Spinner } from "../Util/Spinner";

interface SpinnerInBoxProps {
  size: "small" | "medium" | "large";
  isLoading: boolean;
}

const StyledSpinnerInBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const SpinnerInBox: FC<SpinnerInBoxProps> = ({ size, isLoading }) => {
  if (!isLoading) return null;

  return (
    <StyledSpinnerInBox>
      <Spinner $size={size} />
    </StyledSpinnerInBox>
  );
};
