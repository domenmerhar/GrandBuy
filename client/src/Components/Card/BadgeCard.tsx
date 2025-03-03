import styled from "styled-components";
import { BlankCard } from "../../Util/BlankCard";
import { Column } from "../../Util/Column";
import { Row } from "../../Util/Row";
import { Badge } from "../../Util/Badge";
import React, { FC } from "react";
import { BadgeColor, BadgeProps } from "../../Util/types";
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
  color: BadgeColor;
}

interface RefundBadgeProps {
  children: string;
  date: string;
}

/**
 * BadgeCard komponenta za prikaz kartice z značko in vsebino.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {React.ReactNode | React.ReactNode[]} props.children - Vsebina kartice.
 * @returns {JSX.Element} - JSX element kartice z značko.
 *
 * @example
 * // Uporaba komponente
 * <BadgeCard>
 * <BadgeCard.Header ... />
 * <BadgeCard.ItemList>...</BadgeCard.ItemList>
 * <BadgeCard.P>...</BadgeCard.P>
 * </BadgeCard>
 */

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

/**
 * BadgeCard.ItemList komponenta za prikaz seznama elementov v kartici.
 *
 * @function
 * @returns {JSX.Element} - JSX element seznama elementov.
 */

BadgeCard.ItemList = ItemList;

/**
 * BadgeCard.P komponenta za prikaz odstavka besedila v kartici.
 *
 * @function
 * @returns {JSX.Element} - JSX element odstavka besedila.
 */

BadgeCard.P = P;

const UserLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

/**
 * BadgeCard.Header komponenta za prikaz glave kartice z uporabniškimi informacijami in značko.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {string} props.imageLink - Povezava do slike profila uporabnika.
 * @param {string} props.username - Uporabniško ime.
 * @param {string} props.badgeText - Besedilo značke.
 * @param {string} props.date - Datum.
 * @param {string} props.userId - ID uporabnika.
 * @param {BadgeColor} props.color - Barva značke.
 * @returns {JSX.Element} - JSX element glave kartice.
 */

BadgeCard.Header = ({
  imageLink,
  username,
  badgeText,
  date,
  userId,
  color,
}) => {
  return (
    <Column $gap="8px">
      <Row $justifyContent="space-between" $alignItems="center">
        <UserLink to={`/account/user/${userId}`}>
          <Row $gap="12px" $alignItems="center">
            <ProfileImage src={imageLink} />
            <User>{username}</User>
          </Row>
        </UserLink>

        <Badge $color={color}>{badgeText}</Badge>
      </Row>

      <Date>{date}</Date>
    </Column>
  );
};

/**
 * BadgeCard.Badge komponenta za prikaz značke z datumom.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {string} props.children - Besedilo značke.
 * @param {BadgeColor} props.$color - Barva značke.
 * @param {string} props.date - Datum.
 * @returns {JSX.Element} - JSX element značke z datumom.
 */

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
