import styled from "styled-components";
import { Select } from "../../Util/Select";
import { useSearchParams } from "react-router-dom";

const SelectHolder = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const options = [
  { name: "Sort by age (newest)", value: "-createdAt" },
  { name: "Sort by age (oldest)", value: "+createdAt" },
];

const optionsAdditional = [
  { name: "Sort by likes (highest)", value: "-likes" },
  { name: "Sort by likes (lowest)", value: "+likes" },
];

export const ReviewReplyWindowSelect = () => {
  const [searchParams] = useSearchParams();
  return (
    <SelectHolder>
      <Select
        options={
          searchParams.get("location") === "replies"
            ? options
            : [...options, ...optionsAdditional]
        }
      />
    </SelectHolder>
  );
};
