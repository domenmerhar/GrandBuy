import { useSearchParams } from "react-router-dom";
import { CardWithHeader } from "../../Components/Card/CardWithHeader";
import { Column } from "../../Util/Column";
import { ReviewReplyWindowSelect } from "./ReviewReplyWindowSelect";
import { UserReviews } from "./UserReviews";
import { UserReplies } from "./UserReplies";

/**
 * ReviewReplyWindowBody komponenta za prikaz telesa okna za odgovarjanje na ocene.
 *
 * Ta komponenta prikazuje izbirnik (ReviewReplyWindowSelect) in bodisi ocene (UserReviews) bodisi odgovore (UserReplies) glede na parameter "location" v URL-ju.
 *
 * @returns {JSX.Element} - JSX element, ki predstavlja telo okna za odgovarjanje na ocene.
 *
 * @example
 * // Uporaba komponente
 * <ReviewReplyWindowBody />
 */

export const ReviewReplyWindowBody = () => {
  const [searchParams] = useSearchParams();

  return (
    <CardWithHeader.Body>
      <Column $gap="3.2rem">
        <ReviewReplyWindowSelect />

        {searchParams.get("location") === "replies" ? (
          <UserReplies />
        ) : (
          <UserReviews />
        )}
      </Column>
    </CardWithHeader.Body>
  );
};
