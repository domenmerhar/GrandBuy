import styled from "styled-components";
import { Content } from "../../Util/Content";
import { CartCard } from "./CartCard";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { ProductFilter } from "../../Util/ProductFilter";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr) 35rem);
`;

export const CartPage = () => {
  return (
    <Content>
      <Grid>
        <CartCard />
        <StyledSidebar $position="relative">
          <ProductFilter />
        </StyledSidebar>
      </Grid>
    </Content>
  );
};
