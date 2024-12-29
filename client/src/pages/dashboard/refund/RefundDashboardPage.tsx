import { FilterSortHeader } from "../../../Util/FilterSortHeader";
import { IOption } from "../../../Util/types";

const filterOptions: IOption[] = [
  { value: "all", name: "All" },
  { value: "pending", name: "Pending" },
  { value: "rejected", name: "Rejected" },
  { value: "approved", name: "Approved" },
];

const selectOptions: IOption[] = [
  { value: "newest", name: "Sort by age (newest)" },
  { value: "oldest", name: "Sort by age (oldest)" },
  { value: "all", name: "All" },
];

export const RefundDashboardPage = () => {
  return (
    <>
      <FilterSortHeader
        headerText="Refunds"
        filterOptions={filterOptions}
        selectOptions={selectOptions}
      />
    </>
  );
};
