import styled from "styled-components";
import { CardWithHeader } from "../../Util/CardWithHeader";
import { Column } from "../../Util/Column";
import { ReviewReplyCard } from "./ReviewReplyCard";
import { ReviewReplyWindowSelect } from "./ReviewReplyWindowSelect";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3.2rem;
`;

export const ReviewReplyWindowBody = () => {
  return (
    <CardWithHeader.Body>
      <Column $gap="3.2rem">
        <ReviewReplyWindowSelect />
        <Grid>
          <ReviewReplyCard />
          <ReviewReplyCard />
          <ReviewReplyCard />
          <ReviewReplyCard />
        </Grid>
      </Column>
    </CardWithHeader.Body>
  );
};
