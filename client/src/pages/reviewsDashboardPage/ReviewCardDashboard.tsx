import { BlankCard } from "../../Util/BlankCard";
import { Row } from "../../Util/Row";
import styled from "styled-components";
import { Column } from "../../Util/Column";
import { UserIcon } from "../../Util/ProfileIcon";
import { RatingDisplay } from "../../Components/RatingDisplay";
import { HiArrowUturnLeft, HiOutlineHandThumbUp } from "react-icons/hi2";
import { ReviewAction } from "../../Util/ReviewAction";
import { Modal } from "../../Util/Modal";
import { ReplyModal } from "../product/ReplyModal";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Img = styled.img``;

const Date = styled.p`
  color: var(--gray-6);
  margin-top: -4px;
`;

const P = styled.p`
  max-width: 30ch;
`;

const userId = "id1278203";

export const ReviewCardDashboard = () => {
  const { setIsOpen } = Modal.useModalContext();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleReply = () => {
    setSearchParams((searchParams) => {
      searchParams.set("reply", userId);
      return searchParams;
    });
    setIsOpen(true);
  };

  return (
    <>
      <BlankCard>
        <Row $gap="8px" $alignItems="center">
          <Img src="https://via.placeholder.com/150" alt="review" />

          <Column $gap="6px">
            <Row $gap="4px" $alignItems="center">
              <UserIcon src="https://via.placeholder.com/150" alt="review" />
              John Doe
            </Row>

            <RatingDisplay rating={4.5} showTooltip={false} size={24} />
            <Date>Posted: 29. 12. 2024</Date>
            <P>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
              ut. Voluptatibus reiciendis expedita odio, consequatur debitis
              beatae doloribus assumenda deserunt at, tempora eos laboriosam
              maiores asperiores eius amet sit corrupti?
            </P>

            <Row $gap="1.6rem">
              <ReviewAction $gap="4px" $alignItems="center">
                <HiOutlineHandThumbUp size={24} />
                <span>444</span>
              </ReviewAction>

              <ReviewAction
                $gap="4px"
                $alignItems="center"
                as="button"
                onClick={handleReply}
              >
                <HiArrowUturnLeft size={22} />
                <span>Reply</span>
              </ReviewAction>
            </Row>
          </Column>
        </Row>
      </BlankCard>
      <ReplyModal />
    </>
  );
};
