import { FC } from "react";
import { BadgeCard } from "../../Components/Card/BadgeCard";
import { NotificationType } from "../../Util/types";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const color = type === "message" ? "green" : "red";

  return (
    <BadgeCard>
      <BadgeCard.Badge date={date} $color={color}>
        {t(type)}
      </BadgeCard.Badge>

      <BadgeCard.P>{children}</BadgeCard.P>
    </BadgeCard>
  );
};
