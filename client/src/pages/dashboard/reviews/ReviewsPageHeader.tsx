import { Select } from "../../../Util/Select";
import { Row } from "../../../Util/Row";
import { Header } from "../../../Util/Header";
import { IOption } from "../../../Util/types";

const selectOptions: IOption[] = [
  {
    value: "all",
    name: "All",
  },
  {
    value: "oldest",
    name: "Sort by age (oldest)",
  },
  {
    value: "newest",
    name: "Sort by age (newest)",
  },
];

export const ReviewsPageHeader = () => {
  return (
    <Row $flexWrap="wrap" $justifyContent="space-between" $alignItems="center">
      <Header as="h1" $color="orange" $size="medium">
        Reviews
      </Header>

      <Select options={selectOptions} />
    </Row>
  );
};
