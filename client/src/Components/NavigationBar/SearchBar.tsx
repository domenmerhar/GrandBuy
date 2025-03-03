import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineSearch } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledSearchBar = styled.form`
  display: flex;

  border-radius: 1.5rem;
  overflow: hidden;
  background-color: var(--gray-1);

  flex: 20rem 0.5 1;

  @media (max-width: 49em) {
    flex: 1;
    margin-right: auto;
  }
`;

const Input = styled.input`
  border: none;
  padding: 0.5rem 1rem;
  flex: 10rem 1 1;
  font-size: 1.6rem;

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

  @media (max-width: 49em) {
    font-size: 2.2rem;
    flex: 1;
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

/**
 * Komponenta za iskalno vrstico.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja iskalno vrstico.
 *
 * @example
 * // Uporaba komponente
 * <SearchBar />
 */

export const SearchBar = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { search } = useLocation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current || !inputRef.current.value) return;

    navigate(`/search/${inputRef.current.value}${search}`);
  };

  return (
    <StyledSearchBar onSubmit={handleSubmit}>
      <Input type="text" placeholder={t("searchPlaceholder")} ref={inputRef} />

      <IconHolder>
        <HiOutlineSearch size={24} />
      </IconHolder>
    </StyledSearchBar>
  );
};
