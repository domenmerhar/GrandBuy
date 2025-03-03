import { FC } from "react";
import styled from "styled-components";
import { IOption } from "../Util/types";
import { Row } from "../Util/Row";
import { useSearchParams } from "react-router-dom";

interface FilterProps {
  options: IOption[];
}

const StyledFilter = styled.div`
  padding: 0.8rem 1.2rem;
  background-color: var(--gray-1);
  border: none;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;

  background-color: var(--gray-3);
  transition: all 200ms;

  &:hover,
  &:disabled {
    background-color: var(--orange-4);
    color: var(--gray-1);
  }

  &:active:not(&:disabled) {
    transform: scale(0.95);
  }
`;

export const Filter: FC<FilterProps> = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (value: string) => () => {
    setSearchParams((prev) => {
      prev.set("filter", value);
      return prev;
    });
  };

  return (
    <StyledFilter>
      <Row $justifyContent="space-between" $alignItems="center" $gap="8px">
        {options.map(({ name, value }) => (
          <Button
            onClick={handleClick(value)}
            key={value}
            disabled={searchParams.get("filter") === value}
          >
            {name}
          </Button>
        ))}
      </Row>
    </StyledFilter>
  );
};
