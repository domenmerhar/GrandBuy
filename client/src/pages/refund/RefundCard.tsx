import { t } from "i18next";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { BadgeCard } from "../../Util/BadgeCard";
import { toDate } from "../../functions/toDate";

interface RefundCardProps {
  userId: string;
  userImage: string;
  username: string;

  date: string;
  productName: string;
  productQuantity: number;
  reason: string;
  status: string;
}

export default function RefundCard({
  userId,
  userImage,
  username,

  date,
  productName,
  productQuantity,
  reason,
  status,
}: RefundCardProps) {
  return (
    <BadgeCard>
      <BadgeCard.Header
        imageLink={toApiFilesPath(userImage)}
        badgeText={t(status)}
        username={username}
        date={toDate(date)}
        userId={userId}
      />

      <BadgeCard.ItemList>
        <li>
          {productQuantity}x {productName}
        </li>
      </BadgeCard.ItemList>

      <BadgeCard.P>{reason}</BadgeCard.P>
    </BadgeCard>
  );
}
