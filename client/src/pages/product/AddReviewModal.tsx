import { Column } from "../../Util/Column";
import { Modal } from "../../Components/Modal";
import { RatingInteractive } from "../search/RatingInteractive";
import { useParams, useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { TextareaWithLabel } from "../../Components/TextareaWithLabel";
import { useTranslation } from "react-i18next";
import useCreateReviewOnProduct from "../../hooks/repliesReviews/useCreateReviewOnProduct";
import toast from "react-hot-toast";
import { useJWT } from "../../hooks/useJWT";

/**
 * Komponenta za dodajanje mnenja v modalnem oknu.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja modalno okno za dodajanje mnenja.
 *
 * @example
 * // Uporaba komponente
 * <AddReviewModal />
 */

export const AddReviewModal = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const { JWT } = useJWT();
  const { mutate: createReview } = useCreateReviewOnProduct();
  const { productId } = useParams();
  const { closeModal } = Modal.useModalContext();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const rating = Number(searchParams.get("rating"));

  const removeRatingParam = () =>
    setSearchParams((searchParams) => {
      searchParams.delete("rating");
      return searchParams;
    });

  const handleCancel = () => {
    removeRatingParam();
    close();
  };

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

    closeModal();
  };

  return (
    <Modal.Window
      title={t("addReview")}
      onClose={removeRatingParam}
      buttons={[
        {
          key: "cancel",
          text: t("cancel"),
          color: "red",
          onClick: handleCancel,
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

        <TextareaWithLabel id="content" label={t("review")} ref={textAreaRef} />
      </Column>
    </Modal.Window>
  );
};
