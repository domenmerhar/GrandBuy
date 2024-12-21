import { BadgeCard } from "../../Util/BadgeCard";

export const RefundCard = () => {
  return (
    <BadgeCard>
      <BadgeCard.Header
        imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA4_6SCuZdyzZD0pgNR1ncralqCAz_8w8R_g&s"
        badgeText="Pending"
        username="John Doe"
        date="22. 5. 2025"
      />

      <BadgeCard.ItemList>
        <li>1x Product 1</li>
        <li>2x Product 2</li>
        <li>1x Product 3</li>
      </BadgeCard.ItemList>

      <BadgeCard.P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam fugit
        laudantium aliquid labore et deleniti distinctio. Recusandae libero
        minus laudantium, incidunt magnam deserunt ipsam fugiat perspiciatis ut
        ea dolore obcaecati!
      </BadgeCard.P>
    </BadgeCard>
  );
};
