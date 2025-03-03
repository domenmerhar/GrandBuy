import { CardWithHeader } from "../../Components/Card/CardWithHeader";
import { ReviewReplyWindowHeader } from "./ReviewReplyWindowHeader";
import { ReviewReplyWindowBody } from "./ReviewReplyWindowBody";

/**
 * ReviewReplyWindow komponenta za prikaz okna za odgovarjanje na ocene.
 *
 * Ta komponenta združuje glavo (ReviewReplyWindowHeader) in telo (ReviewReplyWindowBody) okna za odgovarjanje na ocene znotraj kartice (CardWithHeader).
 *
 * @returns {JSX.Element} - JSX element, ki predstavlja okno za odgovarjanje na ocene.
 *
 * @example
 * // Uporaba komponente
 * <ReviewReplyWindow />
 */

export const ReviewReplyWindow = () => {
  return (
    <>
      <CardWithHeader>
        <ReviewReplyWindowHeader />

        <ReviewReplyWindowBody />
      </CardWithHeader>
    </>
  );
};
