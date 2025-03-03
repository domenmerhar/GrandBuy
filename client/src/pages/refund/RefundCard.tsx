import { t } from "i18next";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { BadgeCard } from "../../Components/Card/BadgeCard";
import { toDate } from "../../functions/toDate";
import { Row } from "../../Util/Row";
import styled from "styled-components";
import { HiOutlineArrowUturnLeft } from "react-icons/hi2";
import { Modal } from "../../Components/Modal";
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

/**
 * Komponenta za prikaz kartice vračila.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.reviewId - ID mnenja.
 * @param {string} props.userId - ID uporabnika.
 * @param {string} props.userImage - URL slike uporabnika.
 * @param {string} props.username - Uporabniško ime uporabnika.
 * @param {string} props.date - Datum zahteve za vračilo.
 * @param {string} props.productName - Ime izdelka.
 * @param {number} props.productQuantity - Količina izdelka.
 * @param {string} props.reason - Razlog za vračilo.
 * @param {string} props.status - Stanje vračila.
 * @returns {JSX.Element} JSX element, ki predstavlja kartico vračila.
 *
 * @example
 * // Uporaba komponente
 * <RefundCard
 *   reviewId="1"
 *   userId="user123"
 *   userImage="https://example.com/user.jpg"
 *   username="JaneDoe"
 *   date="2025-03-03"
 *   productName="Izdelek A"
 *   productQuantity={2}
 *   reason="Poškodovan izdelek"
 *   status="pending"
 * />
 */

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
