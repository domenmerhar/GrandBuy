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
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      return setSearchParams({ ...searchParams, [id]: "true" });

    searchParams.delete(id);
    setSearchParams(searchParams);
  };

  return (
    <StyledCheckboxWithText>
      <Checkbox type="checkbox" id={id} onChange={handleCheckboxChange} />
      <label htmlFor={id}>{label}</label>
    </StyledCheckboxWithText>
  );
};
