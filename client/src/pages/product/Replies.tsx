import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { getReplies } from "../dashboard/reviews/getReplies";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { Reply } from "./Reply";
import { toApiFilesPath } from "../../functions/toApiFilesPath";

interface RepliesProps {
  id: string;
}

//TODO: Infinite scrolling

const page = 1;

/**
 * Komponenta za prikaz odgovorov na mnenja.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.id - ID mnenja, na katero odgovarjamo.
 * @returns {JSX.Element} JSX element, ki predstavlja odgovore na mnenja.
 *
 * @example
 * // Uporaba komponente
 * <Replies id="1" />
 */

export const Replies: FC<RepliesProps> = ({ id }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["replies", id, page],
    queryFn: () => getReplies({ reviewId: id, page: 1, limit: 5 }),
  });

  if (isLoading) return <SpinnerInBox size="small" fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <>
      {data?.data?.replies.map(
        ({
          _id,
          user,
          reply,
        }: {
          _id: string;
          user: { image: string; username: string };
          reply: string;
        }) => (
          <Reply
            key={_id}
            content={reply}
            icon={toApiFilesPath(user?.image)}
            username={user?.username}
          />
        )
      )}
    </>
  );
};
