import { Row } from "../../Util/Row";
import { Select } from "../../Util/Select";
import { Filter } from "../../Util/Filter";
import { IOption } from "../../Util/types";
import { Header } from "../../Util/Header";

const selectOptions: IOption[] = [
  { value: "oldest", name: "Sort by age (oldest)" },
  { value: "newest", name: "Sort by age (newest)" },
];

const filterOptions: IOption[] = [
  { value: "all", name: "All" },
  { value: "pending", name: "Pending" },
  { value: "approved", name: "Approved" },
  { value: "rejected", name: "Rejected" },
];

export const RefundPageHeader = () => {
  return (
    <Row
      $justifyContent="space-between"
      $alignItems="center"
      $flexWrap="wrap"
      $gap="2rem"
    >
      <Header as="h2" $size="medium" $color="orange">
        Refund requests
      </Header>

      <Row $gap="12px" $alignItems="center">
        <Filter options={filterOptions} />
        <Select options={selectOptions} />
      </Row>
    </Row>
  );
};
