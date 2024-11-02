import styled from "styled-components";
import { Input } from "./Input";
import { FC } from "react";

interface InputWithLabelProps {
  id: string;
  placeholder: string;
  type: "text" | "password";
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
}) => {
  return (
    <>
      <Label htmlFor={id}>Username</Label>
      <Input type={type} placeholder={placeholder} id={id} />
    </>
  );
};
