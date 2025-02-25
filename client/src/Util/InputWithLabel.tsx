import { ComponentProps, forwardRef } from "react";
import styled from "styled-components";
import { Input } from "./Input";

type InputProps = ComponentProps<typeof Input>;

interface InputWithLabelProps extends InputProps {
  id: string;
  title: string;
  error?: boolean;
}

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ id, title, error = false, ...rest }, ref) => {
    return (
      <>
        <Label htmlFor={id}>{title}</Label>
        <Input id={id} ref={ref} $error={error} {...rest} />
      </>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";
