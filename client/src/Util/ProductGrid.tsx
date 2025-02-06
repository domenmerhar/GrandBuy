import styled from "styled-components";

export const ProductGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(27rem, 27rem));
  justify-content: space-around;

  column-gap: 3.2rem;
  row-gap: 3.2rem;
  margin: 4.8rem 0;
`;
