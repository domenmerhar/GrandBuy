import styled from "styled-components";

export const CardFilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(60rem, 1fr) minmax(25rem, 35rem)
  );

  grid-template-rows: min-content 1fr;
  align-items: start;
  gap: 2.8rem;

  min-height: 77rem;

  & > *:nth-child(2) {
    grid-row: span 2;
  }

  & > *:last-child {
    margin-top: auto;
  }
`;
