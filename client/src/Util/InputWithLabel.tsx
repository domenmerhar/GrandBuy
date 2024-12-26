import { Input } from "./Input";
import { FC } from "react";
import { Label } from "./Label";

interface InputWithLabelProps {
  id: string;
  placeholder: string;
  type: "text" | "password";
  title: string;
  disabled?: boolean;
}

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
