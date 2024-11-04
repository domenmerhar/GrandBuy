import styled from "styled-components";
import { Input } from "./Input";
import { FC } from "react";

interface InputWithLabelProps {
  id: string;
  placeholder: string;
  type: "text" | "password";
  title: string;
  disabled?: boolean;
}

const Label = styled.label`
  color: var(--gray-6);
  font-weight: 600;

  font-size: 1.4rem;
`;

export const InputWithLabel: FC<InputWithLabelProps> = ({
  id,
  placeholder,
  type,
  title,
  disabled,
}) => {
  return (
    <>
      <Label htmlFor={id}>{title}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        id={id}
        disabled={disabled || false}
      />
    </>
  );
};
