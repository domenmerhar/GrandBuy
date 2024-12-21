import styled from "styled-components";
import { Content } from "../../Util/Content";
import { RefundCard } from "../refund/RefundCard";
import { RefundPageHeader } from "../refund/RefundPageHeader";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 42rem));
  justify-content: space-between;

  row-gap: 3.2rem;
  margin-top: 3.2rem;
`;

export const NotificationPage = () => {
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
