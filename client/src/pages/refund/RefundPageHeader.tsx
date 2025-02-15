import { Row } from "../../Util/Row";
import { Select } from "../../Util/Select";
import { Filter } from "../../Util/Filter";
import { IOption } from "../../Util/types";
import { Header } from "../../Util/Header";
import { useTranslation } from "react-i18next";

export const RefundPageHeader = () => {
  const { t } = useTranslation();

  const selectOptions: IOption[] = [
    { value: "oldest", name: t("sortByDateOldest") },
    { value: "newest", name: t("sortByDateNewest") },
  ];

  const filterOptions: IOption[] = [
    { value: "all", name: t("all") },
    { value: "pending", name: t("pending") },
    { value: "approved", name: t("approved") },
    { value: "rejected", name: t("rejected") },
  ];

  return (
    <Row
      $justifyContent="space-between"
      $alignItems="center"
      $flexWrap="wrap"
      $gap="2rem"
    >
      <Header as="h2" $size="medium" $color="orange">
        {t("refundRequests")}
      </Header>

      <Row $gap="12px" $alignItems="center">
        <Filter options={filterOptions} />
        <Select options={selectOptions} />
      </Row>
    </Row>
  );
};
