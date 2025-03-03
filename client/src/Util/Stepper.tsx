import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { StepperRaw } from "../Components/Button/StepperRaw";
interface StepperProps {
  searchParamName: string;
  color?: "orange" | "white";
  max?: number;
  min?: number;
}

export const Stepper: FC<StepperProps> = ({
  searchParamName,
  color = "white",
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
    <StepperRaw
      color={color}
      min={min}
      max={max}
      currentStep={currentStep}
      handleChangePage={handleChangePage}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      disabledLeft={currentStep === 1}
      disabledRight={currentStep === max}
    />
  );
};
