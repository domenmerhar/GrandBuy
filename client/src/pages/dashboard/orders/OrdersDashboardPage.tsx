import { FilterSortHeader } from "../../../Util/FilterSortHeader";
import { Stepper } from "../../../Util/Stepper";

const filterOptions = [
  { value: "all", name: "All" },
  { value: "pending", name: "Pending" },
  { value: "shipped", name: "Shipped" },
  { value: "cancelled", name: "Cancelled" },
  { value: "delivered", name: "Delivered" },
];

const selectOptions = [
  { value: "all", name: "All" },
  { value: "oldest", name: "Sort by age (oldest)" },
  { value: "newest", name: "Sort by age (newest)" },
];

export const OrdersDashboardPage = () => {
  return (
    <>
      <FilterSortHeader
        headerText="Orders"
        filterOptions={filterOptions}
        selectOptions={selectOptions}
      />

      <Stepper searchParamName="page" />
    </>
  );
};
