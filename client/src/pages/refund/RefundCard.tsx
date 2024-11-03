import styled from "styled-components";
import { Badge } from "../../Util/Badge";
import { BlankCard } from "../../Util/BlankCard";
import { Row } from "../../Util/Row";
import { Column } from "../../Util/Column";

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const User = styled.span`
  color: var(--gray-7);
`;

const Date = styled.span`
  font-size: 1.4rem;
  color: var(--gray-6);
`;

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;

  font-weight: 500;

  list-style-type: none;
  color: var(--gray-8);
`;

const P = styled.p`
  color: var(--gray-8);
  max-width: 50ch;
`;

export const RefundCard = () => {
  return (
    <BlankCard>
      <Column $gap="2rem">
        <Column $gap="8px">
          <Row $justifyContent="space-between" $alignItems="center">
            <Row $gap="12px" $alignItems="center">
              <ProfileImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA4_6SCuZdyzZD0pgNR1ncralqCAz_8w8R_g&s" />
              <User>John Doe</User>
            </Row>

            <Badge $color="yellow">Pending</Badge>
          </Row>

          <Date>22. 5. 2025</Date>
        </Column>

        <ItemList>
          <li>1x Product 1</li>
          <li>2x Product 2</li>
          <li>1x Product 3</li>
        </ItemList>

        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam fugit
          laudantium aliquid labore et deleniti distinctio. Recusandae libero
          minus laudantium, incidunt magnam deserunt ipsam fugiat perspiciatis
          ut ea dolore obcaecati!
        </P>
      </Column>
    </BlankCard>
  );
};
