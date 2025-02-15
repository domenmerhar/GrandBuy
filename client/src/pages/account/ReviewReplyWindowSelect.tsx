import styled from "styled-components";
import { Select } from "../../Util/Select";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SelectHolder = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ReviewReplyWindowSelect = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  const options = [
    { name: t("sortByDateNewest"), value: "-createdAt" },
    { name: t("sortByDateOldest"), value: "+createdAt" },
  ];

  const optionsAdditional = [
    { name: t("sortByLikesHighest"), value: "-likes" },
    { name: t("sortByLikesLowest"), value: "+likes" },
  ];

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
