import { FC, useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

import styled from "styled-components";
import { NakedInput } from "./NakedInput";

const StyledStepper = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const StepperButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  padding: 0.8rem;
  background-color: var(--gray-1);
  border-radius: 8px;

  transition: all 200ms;

  &:disabled {
    background-color: var(--gray-4);
    opacity: 0.5;
  }
`;

interface StepperProps {
  searchParamName: string;
  max?: number;
  min?: number;
}

export const Stepper: FC<StepperProps> = ({
  searchParamName,
  max,
  min = 1,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [, setSearchParams] = useSearchParams();

  const handleNextPage = () => setCurrentStep((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentStep((prev) => prev - 1);

  useEffect(() => {
    setSearchParams((searchParams) => {
      searchParams.set(searchParamName, currentStep.toString());
      return searchParams;
    });
  }, [currentStep, setSearchParams, searchParamName]);

  const handleChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 1) return setCurrentStep(1);
    setCurrentStep(+e.target.value);
  };

  return (
    <StyledStepper>
      <StepperButton
        disabled={currentStep === min}
        onClick={handlePreviousPage}
      >
        <HiChevronLeft size={20} fill="#343a40" />
      </StepperButton>

      <NakedInput
        type="number"
        value={currentStep}
        onChange={handleChangePage}
      />

      <StepperButton onClick={handleNextPage} disabled={currentStep === max}>
        <HiChevronRight size={20} fill="#343a40" />
      </StepperButton>
    </StyledStepper>
  );
};
