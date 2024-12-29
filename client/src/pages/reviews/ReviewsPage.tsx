import { HiOutlineMicrophone } from "react-icons/hi";
import { OverviewCard } from "../../Components/OverviewCard";
import { Column } from "../../Util/Column";
import { Header } from "../../Util/Header";
import { Row } from "../../Util/Row";
import { BiStar } from "react-icons/bi";
import { ReviewCardDashboard } from "./ReviewCardDashboard";
import { Modal } from "../../Util/Modal";

export const ReviewsPage = () => {
  return (
    <Column $gap="3.2rem">
      <Header as="h1" $color="orange" $size="medium">
        Reviews{" "}
      </Header>

      <Row $gap="1.6rem" $flexWrap="wrap">
        <OverviewCard
          icon={<HiOutlineMicrophone />}
          title="Reviews"
          content="11111"
        />

        <OverviewCard icon={<BiStar />} title="Average Rating" content="4.5" />
      </Row>

      <Row $alignItems="flex-start">
        <Modal>
          <ReviewCardDashboard />
        </Modal>
      </Row>
    </Column>
  );
};
