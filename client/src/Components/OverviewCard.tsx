import { HiOutlineMicrophone } from "react-icons/hi";
import styled from "styled-components";
import { Column } from "../Util/Column";

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

export const OverviewCard = () => {
  return (
    <Card>
      <IconHolder>
        <HiOutlineMicrophone size={36} />
      </IconHolder>

      <Column>
        <Title>Reviews</Title>
        <Content>1111111</Content>
      </Column>
    </Card>
  );
};
