import { FC } from "react";
import { BadgeCard } from "../../Components/Card/BadgeCard";
import { NotificationType } from "../../Util/types";
import { useTranslation } from "react-i18next";

interface NotificationCardProps {
  date: string;
  type: NotificationType;
  children: string;
}

/**
 * Komponenta za prikaz obvestil.
 *
 * @component
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.date - Datum obvestila.
 * @param {NotificationType} props.type - Vrsta obvestila (message ali alert).
 * @param {string} props.children - Vsebina obvestila.
 * @returns {JSX.Element} JSX element, ki predstavlja obvestilo.
 *
 * @example
 * // Uporaba komponente
 * <NotificationCard date="2025-03-03" type="message">
 *   Novo sporočilo
 * </NotificationCard>
 */

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
