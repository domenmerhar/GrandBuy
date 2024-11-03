import styled from "styled-components";
import { Content } from "../../Util/Content";
import { CartCard } from "./CartCard";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { ProductFilter } from "../../Util/ProductFilter";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(60rem, 1fr) minmax(25rem, 35rem)
  );

  grid-template-rows: min-content min-content;
  align-items: start;
  gap: 2.8rem;
`;

export const CartPage = () => {
  return (
    <Content>
      <Grid>
        <CartCard />
        <StyledSidebar $position="sticky" $width="auto" $height="80vh">
          <ProductFilter />
        </StyledSidebar>
      </Grid>
    </Content>
  );
};
