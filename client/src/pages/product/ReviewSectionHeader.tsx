import { Select } from "../../Util/Select";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { Row } from "../../Util/Row";
import { IOption } from "../../Util/types";

const selectOptions: IOption[] = [
  { name: "Most liked", value: "+likes" },
  { name: "Least liked", value: "-likes" },
  { name: "Most recent", value: "+date" },
  { name: "Least recent", value: "-date" },
];

export const ReviewSectionHeader = () => {
  return (
    <Row $justifyContent="space-between" $flexWrap="wrap">
      <HeaderUppercaseBold>Reviews</HeaderUppercaseBold>
      <Select options={selectOptions} searchParam="sort" />
    </Row>
  );
};
