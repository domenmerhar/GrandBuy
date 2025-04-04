import { CardWithHeader } from "../../Components/Card/CardWithHeader";
import { Row } from "../../Util/Row";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

// const ButtonHolder = styled.div`
//   margin-left: auto;
// `;

/**
 * ReviewReplyWindowHeader komponenta za prikaz glave okna za odgovarjanje na ocene.
 *
 * Ta komponenta prikazuje navigacijske gumbe za preklop med ocenami in odgovori.
 *
 * @returns {JSX.Element} - JSX element, ki predstavlja glavo okna za odgovarjanje na ocene.
 *
 * @example
 * // Uporaba komponente
 * <ReviewReplyWindowHeader />
 */

export const ReviewReplyWindowHeader = () => {
  const { t } = useTranslation();

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
          {t("reviews")}
        </StyledNavLink>
        <StyledNavLink
          onClick={handleLocation("replies")}
          className={location === "replies" ? "active" : ""}
        >
          {t("replies")}
        </StyledNavLink>

        {/* <ButtonHolder>
          <ButtonWithNotifcations>
            <HiDotsVertical />
          </ButtonWithNotifcations>
        </ButtonHolder> */}
      </Row>
    </CardWithHeader.Header>
  );
};
