import { FC } from "react";
import styled from "styled-components";
import { IOption } from "./types";
import { useSearchParams } from "react-router-dom";

interface SelectProps {
  options: IOption[];
  searchParam?: string;
}

const StyledSelect = styled.select`
  padding: 0.8rem 1.2rem;
  background-color: var(--gray-1);
  border: none;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const Option = styled.option``;

export const Select: FC<SelectProps> = ({ options, searchParam = "sort" }) => {
  const [, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((searchParams) => {
      searchParams.set(searchParam, e.target.value);
      return searchParams;
    });
  };

  return (
    <StyledSelect onChange={handleChange}>
      {options.map(({ name, value }) => (
        <Option value={value} key={value}>
          {name}
        </Option>
      ))}
    </StyledSelect>
  );
};
