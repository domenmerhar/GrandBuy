import { FC } from "react";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = Number(searchParams.get(searchParamName)) || 1;

  const setCurrentStep = (newStep: number) =>
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set(searchParamName, String(newStep));
      return prevSearchParams;
    });

  const handleNextPage = () => setCurrentStep(currentStep + 1);
  const handlePreviousPage = () => setCurrentStep(currentStep - 1);

  const handleChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 1) return 1;
    if (max && +e.target.value > max) return setCurrentStep(max);

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
        step={1}
        max={max}
        min={min}
      />

      <StepperButton onClick={handleNextPage} disabled={currentStep === max}>
        <HiChevronRight size={20} fill="#343a40" />
      </StepperButton>
    </StyledStepper>
  );
};
