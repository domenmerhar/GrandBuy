import { forwardRef } from "react";
import styled from "styled-components";
import { Input } from "./Input";

interface InputWithLabelProps {
  id: string;
  placeholder?: string;
  type: string;
  title: string;
  disabled?: boolean;
  min?: number;
  error?: boolean;
}

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ id, placeholder, type, title, disabled, min = 0, error = false }, ref) => {
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
          $error={error}
        />
      </>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";
