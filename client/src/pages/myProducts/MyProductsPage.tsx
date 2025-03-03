import { Content } from "../../Util/Content";
import { Header } from "../../Util/Header";
import { SaleSection } from "../main/SaleSection";

/**
 * Komponenta za prikaz strani z mojimi izdelki.
 *
 * @component
 * @returns {JSX.Element} JSX element, ki predstavlja stran z mojimi izdelki.
 *
 * @example
 * // Uporaba komponente
 * <MyProductsPage />
 */

export const MyProductsPage = () => {
  return (
    <Content>
      <Header as={"h1"} $color="orange" $size="medium">
        My products
      </Header>
      <SaleSection />
    </Content>
  );
};
