import styled from "styled-components";

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(27rem, 27rem));
  justify-content: space-around;

  max-width: 27rem;
  min-width: 27rem;
  column-gap: 3.2rem;
  row-gap: 3.2rem;
  margin: 4.8rem 0;
`;
