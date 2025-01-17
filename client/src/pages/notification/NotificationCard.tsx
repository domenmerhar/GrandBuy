import { FC } from "react";
import { BadgeCard } from "../../Util/BadgeCard";
import { NotificationType } from "../../Util/types";

interface NotificationCardProps {
  date: string;
  type: NotificationType;
  children: string;
}

export const NotificationCard: FC<NotificationCardProps> = ({
  date,
  type,
  children,
}) => {
  const color = type === "message" ? "green" : "red";

  return (
    <BadgeCard>
      <BadgeCard.Badge date={date} $color={color}>
        {type}
      </BadgeCard.Badge>

      <BadgeCard.P>{children}</BadgeCard.P>
    </BadgeCard>
  );
};
