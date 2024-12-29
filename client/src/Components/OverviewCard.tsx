import styled from "styled-components";
import { Column } from "../Util/Column";
import { FC } from "react";

const Card = styled.div`
  background-color: var(--gray-2);
  padding: 1.6rem 2.4rem;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  display: flex;
  gap: 1.6rem;

  align-items: center;
`;

const IconHolder = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  background-color: var(--gray-3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  & svg {
    width: 3.6rem;
    height: 3.6rem;
  }
`;

const Title = styled.h2`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--gray-7);
  font-size: 2rem;
`;

const Content = styled.p`
  font-size: 1.8rem;
  color: var(--gray-7);
`;

interface OverviewCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

export const OverviewCard: FC<OverviewCardProps> = ({
  icon,
  title,
  content,
}) => {
  return (
    <Card>
      <IconHolder>{icon}</IconHolder>

      <Column>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </Column>
    </Card>
  );
};
