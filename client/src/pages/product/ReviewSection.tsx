import { useSearchParams } from "react-router-dom";
import { BlankCard } from "../../Util/BlankCard";
import { Column } from "../../Util/Column";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { Modal } from "../../Util/Modal";
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
  const [, setSearchParams] = useSearchParams();

  const handleModalClose = () => {
    setSearchParams((searchParams) => {
      searchParams.delete("reply");
      return searchParams;
    });
  };

  return (
    <Modal>
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

      <Modal.Window
        title="Reply"
        onCancelReject={handleModalClose}
        onBackdropClick={handleModalClose}
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
        possimus nesciunt eveniet at vitae officiis, illum architecto animi
        atque nemo qui, ab commodi. Beatae, quod mollitia optio tenetur
        voluptatem molestias.
      </Modal.Window>
    </Modal>
  );
};
