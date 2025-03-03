import { useTranslation } from "react-i18next";
import { Content } from "../../Util/Content";
import { Header } from "../../Util/Header";
import { HistoryPageInfiniteProducts } from "./HistoryPageInfiniteProducts";

/**
 * Komponenta za prikaz strani zgodovine.
 *
 * @component
 * @returns {JSX.Element} JSX element, ki predstavlja stran zgodovine.
 *
 * @example
 * // Uporaba komponente
 * <HistoryPage />
 */

export const HistoryPage = () => {
  const { t } = useTranslation();

  return (
    <Content>
      <Header as={"h1"} $color="orange" $size="medium">
        {t("history")}
      </Header>

      <HistoryPageInfiniteProducts />
    </Content>
  );
};
