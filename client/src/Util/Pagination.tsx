import { useEffect, useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

import styled from "styled-components";
import { NakedInput } from "./NakedInput";

const StyledPagination = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  padding: 0.8rem;
  background-color: var(--gray-1);
  border-radius: 8px;

  transition: all 200ms;

  &:disabled {
    background-color: var(--gray-4);
  }
`;

export const Pagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, setSearchParams] = useSearchParams();

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => prev - 1);

  useEffect(() => {
    setSearchParams((searchParams) => {
      searchParams.set("page", currentPage.toString());
      return searchParams;
    });
  }, [currentPage, setSearchParams]);

  const handleChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 1) return setCurrentPage(1);
    setCurrentPage(+e.target.value);
  };

  return (
    <StyledPagination>
      <PageButton disabled={currentPage === 1} onClick={handlePreviousPage}>
        <HiArrowLeft size={20} fill="#343a40" />
      </PageButton>

      <NakedInput
        type="number"
        value={currentPage}
        onChange={handleChangePage}
      />

      <PageButton onClick={handleNextPage}>
        <HiArrowRight size={20} fill="#343a40" />
      </PageButton>
    </StyledPagination>
  );
};
