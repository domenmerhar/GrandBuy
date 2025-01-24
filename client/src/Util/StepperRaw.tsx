import React, { FC } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import styled from "styled-components";
import { NakedInput } from "./NakedInput";

const StyledStepper = styled.div`
  display: flex;
  gap: 1.2rem;
`;

interface StepperButtonProps {
  $color: "orange" | "white";
}

const StepperButton = styled.button<StepperButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  padding: 0.8rem;

  ${({ $color }) =>
    $color === "orange"
      ? "background: linear-gradient(var(--orange-5), var(--orange-6))"
      : "background-color: var(--gray-1)"};

  border-radius: 8px;

  transition: all 200ms;

  &:disabled {
    background-color: var(--gray-4);
    opacity: 0.5;
  }
`;

interface StepperRawProps {
  currentStep: number;

  handlePreviousPage: (e: React.MouseEvent<HTMLButtonElement>) => unknown;
  handleNextPage: (e: React.MouseEvent<HTMLButtonElement>) => unknown;
  handleChangePage: (e: React.ChangeEvent<HTMLInputElement>) => unknown;

  max?: number;
  min?: number;

  disabledLeft?: boolean;
  disabledInput?: boolean;
  disabledRight?: boolean;

  color?: "orange" | "white";
  placeholder?: string;
}

export const StepperRaw: FC<StepperRawProps> = ({
  currentStep,

  handlePreviousPage,
  handleNextPage,
  handleChangePage,

  max,
  min = 1,

  disabledLeft = false,
  disabledInput = false,
  disabledRight = false,

  color = "white",
  placeholder = "",
}) => {
  return (
    <StyledStepper>
      <StepperButton
        disabled={disabledLeft}
        onClick={handlePreviousPage}
        $color={color}
      >
        <HiChevronLeft size={20} fill="#343a40" />
      </StepperButton>

      <NakedInput
        type="number"
        value={currentStep}
        onChange={handleChangePage}
        step={1}
        max={max}
        min={min}
        placeholder={placeholder}
        disabled={disabledInput}
      />

      <StepperButton
        onClick={handleNextPage}
        disabled={disabledRight}
        $color={color}
      >
        <HiChevronRight size={20} fill="#343a40" />
      </StepperButton>
    </StyledStepper>
  );
};
