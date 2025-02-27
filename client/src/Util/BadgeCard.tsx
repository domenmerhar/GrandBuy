import styled from "styled-components";
import { BlankCard } from "./BlankCard";
import { Column } from "./Column";
import { Row } from "./Row";
import { Badge } from "./Badge";
import React, { FC } from "react";
import { BadgeProps } from "./types";
import { Link } from "react-router-dom";

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

const BadgeCorner = styled(Badge)`
  margin-left: auto;
`;

interface RefundCardProps {
  children: React.ReactNode | React.ReactNode[];
}

interface HeaderProps {
  imageLink: string;
  username: string;
  badgeText: string;
  date: string;
  userId: string;
}

interface RefundBadgeProps {
  children: string;
  date: string;
}

export const BadgeCard: FC<RefundCardProps> & {
  ItemList: typeof ItemList;
  P: typeof P;
  Header: FC<HeaderProps>;
  Badge: FC<BadgeProps & RefundBadgeProps>;
} = ({ children }) => {
  return (
    <BlankCard>
      <Column $gap="2rem">{children}</Column>
    </BlankCard>
  );
};

BadgeCard.ItemList = ItemList;

BadgeCard.P = P;

const UserLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

BadgeCard.Header = ({ imageLink, username, badgeText, date, userId }) => {
  return (
    <Column $gap="8px">
      <Row $justifyContent="space-between" $alignItems="center">
        <UserLink to={`/account/user/${userId}`}>
          <Row $gap="12px" $alignItems="center">
            <ProfileImage src={imageLink} />
            <User>{username}</User>
          </Row>
        </UserLink>

        <Badge $color="yellow">{badgeText}</Badge>
      </Row>

      <Date>{date}</Date>
    </Column>
  );
};

BadgeCard.Badge = ({ children, $color, date }) => {
  return (
    <Column $gap="8px">
      <Row $justifyContent="space-between" $alignItems="center">
        <BadgeCorner $color={$color}>{children}</BadgeCorner>
      </Row>

      <Date>{date}</Date>
    </Column>
  );
};
