import { IOption } from "../../Util/types";
import { Select } from "../../Components/Select";
import { SearchSidebar } from "./SearchSidebar";
import { ContentWithSidebar } from "../../Util/ContentWithSidebar";
import { SidebarLayout } from "../../Util/SidebarLayout";
import { SearchResults } from "./SearchResults";
import { useTranslation } from "react-i18next";

/**
 * Komponenta za prikaz strani iskanja.
 *
 * @component
 * @returns {JSX.Element} JSX element, ki predstavlja stran iskanja.
 *
 * @example
 * // Uporaba komponente
 * <SearchPage />
 */

export const SearchPage = () => {
  const { t } = useTranslation();

  const selectOptions: IOption[] = [
    { name: t("sortByOrdersMost"), value: "-orders" },
    { name: t("sortByOrdersLeast"), value: "orders" },
    { name: t("sortByPriceHighest"), value: "-totalPrice" },
    { name: t("sortByPriceLowest"), value: "+totalPrice" },
    { name: t("sortByDateNewest"), value: "-createdAt" },
    { name: t("sortByDateOldest"), value: "+createdAt" },
  ];

  return (
    <SidebarLayout>
      <SearchSidebar />
      <ContentWithSidebar>
        <Select options={selectOptions} />

        <SearchResults />
      </ContentWithSidebar>
    </SidebarLayout>
  );
};
