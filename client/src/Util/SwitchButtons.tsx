import { FC } from "react";
import { IOption } from "./types";
import styled from "styled-components";

interface SwitchButtonOption extends IOption {
  disabled?: boolean;
}

interface SwitchButtonsProps {
  options: SwitchButtonOption[];
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value?: string
  ) => void;
}

const StyledSwitchButtons = styled.div`
  display: flex;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Button = styled.button`
  border: none;
  padding: 0.5rem 0.75rem;

  background-color: var(--gray-1);
  transition: all 200ms;
  font-weight: 500;

  &:hover,
  &:disabled {
    background-color: var(--orange-4);
    color: var(--gray-1);
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`;

export const SwitchButtons: FC<SwitchButtonsProps> = ({ options, onClick }) => {
  return (
    <StyledSwitchButtons>
      {options.map(({ name, value, disabled }) => (
        <Button
          key={value}
          onClick={onClick ? (e) => onClick(e, value) : () => {}}
          disabled={disabled}
        >
          {name}
        </Button>
      ))}
    </StyledSwitchButtons>
  );
};
