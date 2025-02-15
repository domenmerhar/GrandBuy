import { Select } from "../../../Util/Select";
import { Row } from "../../../Util/Row";
import { Header } from "../../../Util/Header";
import { IOption } from "../../../Util/types";
import { useTranslation } from "react-i18next";

export const ReviewsPageHeader = () => {
  const { t } = useTranslation();

  const selectOptions: IOption[] = [
    {
      value: "all",
      name: t("all"),
    },
    {
      value: "oldest",
      name: t("sortByDateOldest"),
    },
    {
      value: "newest",
      name: t("sortByDateNewest"),
    },
  ];

  return (
    <Row $flexWrap="wrap" $justifyContent="space-between" $alignItems="center">
      <Header as="h1" $color="orange" $size="medium">
        {t("reviews")}
      </Header>

      <Select options={selectOptions} />
    </Row>
  );
};
