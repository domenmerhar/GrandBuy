import { Select } from "../../Components/Select";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { Row } from "../../Util/Row";
import { IOption } from "../../Util/types";
import { useTranslation } from "react-i18next";

/**
 * Komponenta za prikaz glave sekcije mnenj.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja glavo sekcije mnenj.
 *
 * @example
 * // Uporaba komponente
 * <ReviewSectionHeader />
 */

export const ReviewSectionHeader = () => {
  const { t } = useTranslation();

  const selectOptions: IOption[] = [
    { name: t("sortByLikesHighest"), value: "-likesCount" },
    { name: t("sortByLikesLowest"), value: "+likesCount" },
    { name: t("sortByDateNewest"), value: "-createdAt" },
    { name: t("sortByDateOldest"), value: "+createdAt" },
  ];

  return (
    <Row $justifyContent="space-between" $flexWrap="wrap">
      <HeaderUppercaseBold>{t("reviews")}</HeaderUppercaseBold>
      <Select options={selectOptions} searchParam="sort" />
    </Row>
  );
};
