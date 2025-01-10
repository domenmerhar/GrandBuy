import styled from "styled-components";
import { BlankCard } from "../../Util/BlankCard";
import { Column } from "../../Util/Column";
import { Row } from "../../Util/Row";
import { FC } from "react";

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: transparent;
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

interface ReviewReplyCardProps {
  profileImage: string;
  username: string;
  date: string;
  content: string;
}

export const ReviewReplyCard: FC<ReviewReplyCardProps> = ({
  profileImage,
  username,
  date,
  content,
}) => {
  return (
    <BlankCard>
      <Column $gap="2rem">
        <Column $gap="8px">
          <Row $justifyContent="space-between" $alignItems="center">
            <Row $gap="12px" $alignItems="center">
              <ProfileImage src={profileImage} alt={username} />
              <User>{username}</User>
            </Row>
          </Row>

          <Date>{date}</Date>
        </Column>

        <P>{content}</P>
      </Column>
    </BlankCard>
  );
};
