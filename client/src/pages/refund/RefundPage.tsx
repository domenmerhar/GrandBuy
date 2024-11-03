import styled from "styled-components";
import { Content } from "../../Util/Content";
import { RefundCard } from "./RefundCard";
import { RefundPageHeader } from "./RefundPageHeader";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 42rem));
  justify-content: space-between;

  row-gap: 3.2rem;
  margin-top: 3.2rem;
`;

export const RefundPage = () => {
  return (
    <Content>
      <RefundPageHeader />
      <Grid>
        <RefundCard />
        <RefundCard />
        <RefundCard />
        <RefundCard />
      </Grid>
    </Content>
  );
};
