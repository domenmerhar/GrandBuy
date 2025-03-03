import { FC } from "react";
import styled from "styled-components";
import { IOption } from "../Util/types";
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
  font-size: 1.6rem;
`;

const Option = styled.option``;

/**
 * Komponenta za prikaz izbire.
 *
 * @component
 * @param {Object} props - Lastnosti komponente.
 * @param {IOption[]} props.options - Seznam možnosti za izbiro.
 * @param {string} [props.searchParam] - Iskalni parameter (privzeto "sort").
 * @returns {JSX.Element} JSX element, ki predstavlja izbiro.
 *
 * @example
 * // Uporaba komponente
 * <Select options={[{ name: 'Ime', value: 'value' }]} searchParam="filter" />
 */

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
