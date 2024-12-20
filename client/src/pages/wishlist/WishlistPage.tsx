import { Content } from "../../Util/Content";
import { Header } from "../../Util/Header";
import { SaleSection } from "../main/SaleSection";

export const WishlistPage = () => {
  return (
    <Content>
      <Header as={"h1"} $color="orange" $size="medium">
        Wishlist
      </Header>
      <SaleSection />
    </Content>
  );
};
