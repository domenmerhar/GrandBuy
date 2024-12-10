import styled from "styled-components";
import { ButtonWithNotifcations } from "../../Components/ButtonWithNotifcations";
import { CardWithHeader } from "../../Util/CardWithHeader";
import { Row } from "../../Util/Row";
import { HiDotsVertical } from "react-icons/hi";
import { ReviewReplyCard } from "./ReviewReplyCard";
import { ReviewReplyWindowSelect } from "./ReviewReplyWindowSelect";
import { Column } from "../../Util/Column";
import { ReviewReplyWindowHeader } from "./ReviewReplyWindowHeader";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3.2rem;
`;

export const ReviewReplyWindow = () => {
  return (
    <>
      <CardWithHeader>
        <ReviewReplyWindowHeader />

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
      </CardWithHeader>
    </>
  );
};
