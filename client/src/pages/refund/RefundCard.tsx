import { t } from "i18next";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { BadgeCard } from "../../Util/BadgeCard";
import { toDate } from "../../functions/toDate";
import { Row } from "../../Util/Row";
import styled from "styled-components";
import { HiOutlineArrowUturnLeft } from "react-icons/hi2";
import { Modal } from "../../Util/Modal";
import { useSearchParams } from "react-router-dom";
import { BadgeColor } from "../../Util/types";

interface RefundCardProps {
  reviewId: string;

  userId: string;
  userImage: string;
  username: string;

  date: string;
  productName: string;
  productQuantity: number;
  reason: string;
  status: string;
}

const ReplyHolder = styled(Row)`
  cursor: pointer;
  font-weight: 500;
  text-transform: uppercase;

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

export default function RefundCard({
  reviewId,

  userId,
  userImage,
  username,

  date,
  productName,
  productQuantity,
  reason,
  status,
}: RefundCardProps) {
  const { setIsOpen } = Modal.useModalContext();
  const [, setSearchParams] = useSearchParams();

  let color: BadgeColor;
  switch (status) {
    case "approved":
      color = "green";
      break;

    case "rejected":
      color = "red";
      break;

    default:
      color = "yellow";
      break;
  }

  const handleClick = () => {
    setSearchParams((prev) => {
      prev.set("refund-id", reviewId);
      return prev;
    });
    setIsOpen(true);
  };

  return (
    <BadgeCard>
      <BadgeCard.Header
        imageLink={toApiFilesPath(userImage)}
        badgeText={t(status)}
        username={username}
        date={toDate(date)}
        userId={userId}
        color={color}
      />

      <BadgeCard.ItemList>
        <li>
          {productQuantity}x {productName}
        </li>
      </BadgeCard.ItemList>

      <BadgeCard.P>{reason}</BadgeCard.P>

      {status === "pending" ? (
        <ReplyHolder $alignItems="center" $gap=".8rem" onClick={handleClick}>
          <HiOutlineArrowUturnLeft />
          {t("reply")}
        </ReplyHolder>
      ) : null}
    </BadgeCard>
  );
}
