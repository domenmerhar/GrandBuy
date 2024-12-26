import { Column } from "../../Util/Column";
import { ProgressWithLabel } from "../../Components/ProgressWithLabel";
import { AverageRating } from "./AverageRating";

export const RatingBreakdown = () => {
  return (
    <Column $gap=".8rem">
      <AverageRating rating={2.3} />

      <ProgressWithLabel value={10} max={100}>
        5 stars (10%)
      </ProgressWithLabel>

      <ProgressWithLabel value={30} max={100}>
        4 stars (30%)
      </ProgressWithLabel>

      <ProgressWithLabel value={30} max={100}>
        3 stars (30%)
      </ProgressWithLabel>

      <ProgressWithLabel value={20} max={100}>
        2 stars (20%)
      </ProgressWithLabel>

      <ProgressWithLabel value={10} max={100}>
        1 stars (10%)
      </ProgressWithLabel>
    </Column>
  );
};
