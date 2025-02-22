import { BlankCard } from "../../../Util/BlankCard";
import { Row } from "../../../Util/Row";
import styled from "styled-components";
import { Column } from "../../../Util/Column";
import { UserIcon } from "../../../Util/ProfileIcon";
import { RatingDisplay } from "../../../Components/RatingDisplay";
import { HiArrowUturnLeft, HiOutlineHandThumbUp } from "react-icons/hi2";
import { ReviewAction } from "../../../Util/ReviewAction";
import { Modal } from "../../../Util/Modal";
import { ReplyModal } from "../../product/ReplyModal";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMe } from "../../../hooks/useMe";
import { FC } from "react";
import { toApiFilesPath } from "../../../functions/toApiFilesPath";
import { toDate } from "../../../functions/toDate";

const Img = styled.img`
  color: transparent;
  width: 12.8rem;
`;

const Date = styled.p`
  color: var(--gray-6);
  margin-top: -4px;
`;

const P = styled.p`
  max-width: 30ch;
`;

interface ReviewCardDashboardProps {
  productImage: string;
  productName: string;
  userImage: string;
  username: string;
  rating: number;
  date: string;
  review: string;
  likes: number;
}

export const ReviewCardDashboard: FC<ReviewCardDashboardProps> = ({
  productImage,
  productName,
  userImage,
  username,
  rating,
  date,
  review,
  likes,
}) => {
  const { t } = useTranslation();
  const { data } = useMe();

  const userId = data?.data?.user?._id;

  const { setIsOpen } = Modal.useModalContext();
  const [, setSearchParams] = useSearchParams();

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
          <Img src={toApiFilesPath(productImage)} alt={productName} />

          <Column $gap="6px">
            <Row $gap="4px" $alignItems="center">
              <UserIcon src={toApiFilesPath(userImage)} alt={username} />
              {username}
            </Row>

            <RatingDisplay rating={rating} showTooltip={false} size={24} />
            <Date>
              {t("posted")}: {toDate(date)}
            </Date>
            <P>{review}</P>

            <Row $gap="1.6rem">
              <ReviewAction $gap="4px" $alignItems="center">
                <HiOutlineHandThumbUp size={24} />
                <span>{likes}</span>
              </ReviewAction>

              <ReviewAction
                $gap="4px"
                $alignItems="center"
                as="button"
                onClick={handleReply}
              >
                <HiArrowUturnLeft size={22} />
                <span>{t("reply")}</span>
              </ReviewAction>
            </Row>
          </Column>
        </Row>
      </BlankCard>
      <ReplyModal />
    </>
  );
};
