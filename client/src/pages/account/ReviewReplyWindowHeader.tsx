import { HiDotsVertical } from "react-icons/hi";
import { ButtonWithNotifcations } from "../../Components/ButtonWithNotifcations";
import { CardWithHeader } from "../../Util/CardWithHeader";
import { Row } from "../../Util/Row";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledNavLink = styled.button`
  text-decoration: none;
  color: var(--gray-1);

  border: none;
  background-color: transparent;
  text-transform: uppercase;

  &.active {
    font-weight: 600;
  }
`;

const ButtonHolder = styled.div`
  margin-left: auto;
`;

export const ReviewReplyWindowHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get("location");

  const handleLocation = (newLocation: "reviews" | "replies") => () =>
    setSearchParams((params) => {
      params.set("location", newLocation);
      params.set("sort", "-createdAt");
      return params;
    });

  return (
    <CardWithHeader.Header>
      <Row $gap="1.6rem" $alignItems="center">
        <StyledNavLink
          onClick={handleLocation("reviews")}
          className={
            location === "reviews" || location === null ? "active" : ""
          }
        >
          Reviews
        </StyledNavLink>
        <StyledNavLink
          onClick={handleLocation("replies")}
          className={location === "replies" ? "active" : ""}
        >
          Replies
        </StyledNavLink>

        <ButtonHolder>
          <ButtonWithNotifcations>
            <HiDotsVertical />
          </ButtonWithNotifcations>
        </ButtonHolder>
      </Row>
    </CardWithHeader.Header>
  );
};
