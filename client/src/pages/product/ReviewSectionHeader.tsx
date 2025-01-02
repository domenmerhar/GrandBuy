import { Select } from "../../Util/Select";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { Row } from "../../Util/Row";
import { IOption } from "../../Util/types";

const selectOptions: IOption[] = [
  { name: "Most liked", value: "+likesCount" },
  { name: "Least liked", value: "-likesCount" },
  { name: "Most recent", value: "+createdAt" },
  { name: "Least recent", value: "-createdAt" },
];

export const ReviewSectionHeader = () => {
  return (
    <Row $justifyContent="space-between" $flexWrap="wrap">
      <HeaderUppercaseBold>Reviews</HeaderUppercaseBold>
      <Select options={selectOptions} searchParam="sort" />
    </Row>
  );
};
