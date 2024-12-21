import { BadgeCard } from "../../Util/BadgeCard";

export const NotificationCard = () => {
  return (
    <BadgeCard>
      <BadgeCard.Badge date="22. 5. 2024" $color="green">
        Message
      </BadgeCard.Badge>

      <BadgeCard.P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam fugit
        laudantium aliquid labore et deleniti distinctio. Recusandae libero
        minus laudantium, incidunt magnam deserunt ipsam fugiat perspiciatis ut
        ea dolore obcaecati!
      </BadgeCard.P>
    </BadgeCard>
  );
};
