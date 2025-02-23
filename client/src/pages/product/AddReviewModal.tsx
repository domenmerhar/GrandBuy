import { Column } from "../../Util/Column";
import { Modal } from "../../Util/Modal";
import { RatingInteractive } from "../search/RatingInteractive";
import { useParams, useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { TextareaWithLabel } from "../../Components/TextareaWithLabel";
import { useTranslation } from "react-i18next";
import useCreateReviewOnProduct from "../../hooks/repliesReviews/useCreateReviewOnProduct";
import toast from "react-hot-toast";
import { useJWT } from "../../hooks/useJWT";

export const AddReviewModal = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const { JWT } = useJWT();
  const { mutate: createReview } = useCreateReviewOnProduct();
  const { productId } = useParams();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const rating = Number(searchParams.get("rating"));

  const handleSubmit = () => {
    removeRatingParam();

    if (!textAreaRef.current?.value || !rating)
      toast.error(t("fillAllFields"), { id: "review" });

    createReview({
      JWT,
      rating,
      productId: String(productId),
      review: String(textAreaRef.current?.value),
    });
  };

  const removeRatingParam = () =>
    setSearchParams((searchParams) => {
      searchParams.delete("rating");
      return searchParams;
    });

  return (
    <Modal.Window
      title={t("addReview")}
      onClose={removeRatingParam}
      buttons={[
        {
          key: "cancel",
          text: t("cancel"),
          color: "red",
          onClick: removeRatingParam,
        },
        {
          key: "submit",
          text: t("submit"),
          color: "green",
          onClick: handleSubmit,
        },
      ]}
    >
      <Column $gap="8px" as="form">
        <RatingInteractive size={28} fontSize="1.6rem" />

        <TextareaWithLabel
          id="content"
          label="Content"
          ref={textAreaRef}
          placeholder="Beautiful product. I love it!"
        />
      </Column>
    </Modal.Window>
  );
};
