import { Content } from "../../Util/Content";
import { Header } from "../../Util/Header";
import { HistoryPageInfiniteProducts } from "./HistoryPageInfiniteProducts";

export const HistoryPage = () => {
  return (
    <Content>
      <Header as={"h1"} $color="orange" $size="medium">
        Recent History
      </Header>

      <HistoryPageInfiniteProducts />
    </Content>
  );
};
