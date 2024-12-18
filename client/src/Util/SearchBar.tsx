import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSearchBar = styled.form`
  display: flex;
  align-items: center;

  border-radius: 1.5rem;
  overflow: hidden;
  background-color: var(--gray-1);
`;

const Input = styled.input`
  border: none;
  padding: 0.5rem 1rem;
  flex: 10rem 1 1;

  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  background-color: inherit;

  transition: all 200ms;

  &::placeholder {
    color: var(--gray-6);
  }

  &:focus {
    outline: none;
    background-color: var(--gray-0);
  }
`;

const IconHolder = styled.button`
  display: flex;
  flex: 5rem 0 0;

  justify-content: center;
  align-items: center;
  background-color: inherit;
  padding: 0.5rem 1.5rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border: none;

  transition: transform 200ms;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((searchParams) => {
      searchParams.set("search", e.target.value);
      return searchParams;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchParams.get("search")) return;
    navigate(`/product/${searchParams.get("search")}`);
  };

  return (
    <StyledSearchBar onSubmit={handleSubmit}>
      <Input
        type="text"
        onChange={searchHandler}
        placeholder="Magnifying glass"
      />

      <IconHolder>
        <HiOutlineSearch size={24} />
      </IconHolder>
    </StyledSearchBar>
  );
};
