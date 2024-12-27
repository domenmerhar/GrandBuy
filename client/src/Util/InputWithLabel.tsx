import { Input } from "./Input";
import { FC } from "react";
import { Label } from "./Label";

interface InputWithLabelProps {
  id: string;
  placeholder: string;
  type: "text" | "password" | "number";
  title: string;
  ref?: React.RefObject<HTMLInputElement>;
  disabled?: boolean;
  min?: number;
}

export const InputWithLabel: FC<InputWithLabelProps> = ({
  id,
  placeholder,
  type,
  title,
  ref,
  disabled,
  min = 0,
}) => {
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
};
