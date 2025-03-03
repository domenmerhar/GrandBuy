import { useTranslation } from "react-i18next";
import { FilterSortHeader } from "../../../Components/FilterSortHeader";
import { Modal } from "../../../Components/Modal";
import { Stepper } from "../../../Components/Stepper";
import { IOption } from "../../../Util/types";
import { DashboardRefunds } from "./DashboardRefunds";

/**
 * Komponenta za prikaz nadzorne plošče za vračila.
 *
 * @component
 * @returns {JSX.Element} JSX element, ki predstavlja nadzorno ploščo za vračila.
 *
 * @example
 * // Uporaba komponente
 * <RefundDashboardPage />
 */

export const RefundDashboardPage = () => {
  const { t } = useTranslation();

  const filterOptions: IOption[] = [
    { value: "all", name: t("all") },
    { value: "pending", name: t("pending") },
    { value: "rejected", name: t("rejected") },
    { value: "approved", name: t("approved") },
  ];

  const selectOptions: IOption[] = [
    { value: "newest", name: t("sortByDateNewest") },
    { value: "oldest", name: t("sortByDateOldest") },
  ];

  return (
    <>
      <FilterSortHeader
        headerText={t("refunds")}
        filterOptions={filterOptions}
        selectOptions={selectOptions}
      />

      <Modal>
        <DashboardRefunds />
      </Modal>

      <Stepper searchParamName="page" />
    </>
  );
};
