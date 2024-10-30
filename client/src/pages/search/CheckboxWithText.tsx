import { FC } from "react";
import styled from "styled-components";
import { Checkbox } from "../../Util/Checkbox";

interface CheckboxProps {
  id: string;
  label: string;
}

const StyledCheckboxWithText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > *:first-child {
    margin-top: 2px;
  }
`;

const Label = styled.label``;

export const CheckboxWithText: FC<CheckboxProps> = ({ id, label }) => {
  return (
    <StyledCheckboxWithText>
      <Checkbox type="checkbox" id={id} />
      <Label htmlFor={id}>{label}</Label>
    </StyledCheckboxWithText>
  );
};
