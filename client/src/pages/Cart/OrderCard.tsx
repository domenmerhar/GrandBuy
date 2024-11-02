import { BlankCard } from "../../Util/BlankCard";
import { Column } from "../../Util/Column";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { Row } from "../../Util/Row";
import { CartItem } from "./CartItem";

export const OrderCard = () => {
  return (
    <BlankCard>
      <Column $gap="1.6rem">
        <Row $justifyContent="space-between">
          <HeaderUppercaseBold>Cart</HeaderUppercaseBold>
          Items(2)
        </Row>
        <CartItem />
      </Column>
    </BlankCard>
  );
};
