import { Content } from "../../Util/Content";
import { Header } from "../../Util/Header";
import { SaleSection } from "../main/SaleSection";

export const MyProducts = () => {
  return (
    <Content>
      <Header as={"h1"} $color="orange" $size="medium">
        My products
      </Header>
      <SaleSection />
    </Content>
  );
};
