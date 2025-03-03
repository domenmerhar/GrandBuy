import React, { FC } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import styled from "styled-components";
import { NakedInput } from "../../Util/NakedInput";

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
      ? "background: linear-gradient(45deg, var(--orange-5), var(--orange-6));"
      : `background-color: var(--gray-1);
      body.dark-mode & {
      background-color: var(--gray-3);
    }

    body.dark-mode &:disabled {
      background-color: var(--gray-0);
    }`}

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
  handleBlurPage: (e: React.ChangeEvent<HTMLInputElement>) => unknown;

  max?: number;
  min?: number;

  disabledLeft?: boolean;
  disabledInput?: boolean;
  disabledRight?: boolean;

  color?: "orange" | "white";
  placeholder?: string;
}

/**
 * StepperRaw komponenta za prikaz številčnega stepperja.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {number} props.currentStep - Trenutna vrednost stepperja.
 * @param {function} props.handlePreviousPage - Funkcija za obravnavo klika na gumb za prejšnjo stran.
 * @param {function} props.handleNextPage - Funkcija za obravnavo klika na gumb za naslednjo stran.
 * @param {function} props.handleChangePage - Funkcija za obravnavo spremembe vrednosti v vnosnem polju.
 * @param {function} props.handleBlurPage - Funkcija za obravnavo izgube fokusa v vnosnem polju.
 * @param {number} [props.max] - Največja dovoljena vrednost.
 * @param {number} [props.min=1] - Najmanjša dovoljena vrednost.
 * @param {boolean} [props.disabledLeft=false] - Ali je gumb za prejšnjo stran onemogočen.
 * @param {boolean} [props.disabledInput=false] - Ali je vnosno polje onemogočeno.
 * @param {boolean} [props.disabledRight=false] - Ali je gumb za naslednjo stran onemogočen.
 * @param {"orange" | "white"} [props.color="white"] - Barva gumbov stepperja.
 * @param {string} [props.placeholder=""] - Namig za vnosno polje.
 * @returns {JSX.Element} - JSX element številčnega stepperja.
 *
 * @example
 * // Uporaba komponente
 * <StepperRaw
 * currentStep={5}
 * handlePreviousPage={() => console.log('Prejšnja stran')}
 * handleNextPage={() => console.log('Naslednja stran')}
 * handleChangePage={(e) => console.log('Sprememba', e.target.value)}
 * handleBlurPage={(e) => console.log('Izguba fokusa', e.target.value)}
 * max={10}
 * min={1}
 * color="orange"
 * />
 */

export const StepperRaw: FC<StepperRawProps> = ({
  currentStep,

  handlePreviousPage,
  handleNextPage,
  handleChangePage,
  handleBlurPage,

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
        onBlur={handleBlurPage}
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
