import { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { Checkbox } from "../../Util/Checkbox";
import { useSearchParams } from "react-router-dom";

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

export const CheckboxWithText: FC<CheckboxProps> = ({ id, label }) => {
  const [, setSearchParams] = useSearchParams();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      return setSearchParams((searchParams) => {
        searchParams.set(id, "true");
        return searchParams;
      });

    setSearchParams((searchParams) => {
      searchParams.delete(id);
      return searchParams;
    });
  };

  return (
    <StyledCheckboxWithText>
      <Checkbox type="checkbox" id={id} onChange={handleCheckboxChange} />
      <label htmlFor={id}>{label}</label>
    </StyledCheckboxWithText>
  );
};
