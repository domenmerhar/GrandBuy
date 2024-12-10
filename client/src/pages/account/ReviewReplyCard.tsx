import styled from "styled-components";
import { ButtonWithNotifcations } from "../../Components/ButtonWithNotifcations";
import { CardWithHeader } from "../../Util/CardWithHeader";
import { Row } from "../../Util/Row";
import { HiDotsVertical } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--gray-1);

  &.active {
    font-weight: 600;
  }
`;

const ButtonHolder = styled.div`
  margin-left: auto;
`;

export const ReviewReplyCard = () => {
  return (
    <>
      <CardWithHeader>
        <CardWithHeader.Header>
          <Row $gap="1.6rem" $alignItems="center">
            <StyledNavLink to="account">Reviews</StyledNavLink>
            <StyledNavLink to="replies">Replies</StyledNavLink>

            <ButtonHolder>
              <ButtonWithNotifcations>
                <HiDotsVertical />
              </ButtonWithNotifcations>
            </ButtonHolder>
          </Row>
        </CardWithHeader.Header>
        <CardWithHeader.Body>
          <p>Reviews</p>
          <p>Replies</p>
        </CardWithHeader.Body>
      </CardWithHeader>
    </>
  );
};
