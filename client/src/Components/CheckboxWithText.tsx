import { ChangeEventHandler, FC, ComponentProps } from "react";
import styled from "styled-components";
import { Checkbox } from "../Util/Checkbox";

interface CheckboxProps extends ComponentProps<typeof Checkbox> {
  id: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const StyledCheckboxWithText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > *:first-child {
    margin-top: 2px;
  }
`;

export const CheckboxWithText: FC<CheckboxProps> = ({
  id,
  label,
  onChange,
  ...rest
}) => {
  return (
    <StyledCheckboxWithText>
      <Checkbox type="checkbox" id={id} onChange={onChange} {...rest} />
      <label htmlFor={id}>{label}</label>
    </StyledCheckboxWithText>
  );
};
