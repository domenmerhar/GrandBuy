import styled from "styled-components";
import { BlankCard } from "../../Util/BlankCard";
import { Column } from "../../Util/Column";
import { Row } from "../../Util/Row";

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

const P = styled.p`
  color: var(--gray-8);
  max-width: 50ch;
`;

export const ReviewReplyCard = () => {
  return (
    <BlankCard>
      <Column $gap="2rem">
        <Column $gap="8px">
          <Row $justifyContent="space-between" $alignItems="center">
            <Row $gap="12px" $alignItems="center">
              <ProfileImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA4_6SCuZdyzZD0pgNR1ncralqCAz_8w8R_g&s" />
              <User>John Doe</User>
            </Row>
          </Row>

          <Date>22. 5. 2025</Date>
        </Column>

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
