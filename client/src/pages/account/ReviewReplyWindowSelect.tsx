import styled from "styled-components";
import { Select } from "../../Util/Select";

const SelectHolder = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const options = [
  { name: "Sort by age (newest)", value: "-date" },
  { name: "Sort by age (oldest)", value: "date" },
];

export const ReviewReplyWindowSelect = () => {
  return (
    <SelectHolder>
      <Select options={options} />
    </SelectHolder>
  );
};
