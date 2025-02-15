import { useTranslation } from "react-i18next";
import { Content } from "../../Util/Content";
import { Header } from "../../Util/Header";
import { HistoryPageInfiniteProducts } from "./HistoryPageInfiniteProducts";

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
