import { forwardRef } from "react";
import styled from "styled-components";

interface InputWithLabelProps {
  id: string;
  placeholder?: string;
  type: string;
  title: string;
  disabled?: boolean;
  min?: number;
}

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ id, placeholder, type, title, disabled, min = 0 }, ref) => {
    return (
      <>
        <Label htmlFor={id}>{title}</Label>
        <Input
          type={type}
          placeholder={placeholder}
          id={id}
          disabled={disabled || false}
          min={min}
          ref={ref}
        />
      </>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";
