import { BlankCard } from "../../Util/BlankCard";
import { Column } from "../../Util/Column";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { Row } from "../../Util/Row";
import { Select } from "../../Util/Select";
import { IOption } from "../../Util/types";
import { AverageRating } from "./AverageRating";
import { RatingBreakdown } from "./RatingBreakDown";
import { Review } from "./Review";

const selectOptions: IOption[] = [
  { name: "Most liked", value: "+likes" },
  { name: "Least liked", value: "-likes" },
  { name: "Most recent", value: "+date" },
  { name: "Least recent", value: "-date" },
];

export const ReviewSection = () => {
  return (
    <BlankCard>
      <Column $gap="1.2rem">
        <Row $justifyContent="space-between" $flexWrap="wrap">
          <HeaderUppercaseBold>Reviews</HeaderUppercaseBold>
          <Select options={selectOptions} searchParam="sort" />
        </Row>

        <AverageRating rating={2.3} />

        <Row $gap="3.2rem">
          <RatingBreakdown />
          <Column $gap="3.2rem">
            {Array.from({ length: 3 }).map((_, i) => (
              <Review key={i} />
            ))}
          </Column>
        </Row>
      </Column>
    </BlankCard>
  );
};
