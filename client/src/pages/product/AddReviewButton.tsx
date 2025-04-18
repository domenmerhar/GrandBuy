import { Button } from "../../Util/Button";
import { Modal } from "../../Components/Modal";
import styled from "styled-components";
import { AddReviewModal } from "./AddReviewModal";
import { useTranslation } from "react-i18next";

const PostReviewButton = styled(Button)`
  align-self: flex-end;
`;

/**
 * Komponenta za dodajanje gumba za oceno.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja gumb za dodajanje ocene.
 *
 * @example
 * // Uporaba komponente
 * <AddReviewButton />
 */

export const AddReviewButton = () => {
  const { t } = useTranslation();
  const { setIsOpen } = Modal.useModalContext();

  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <>
      <PostReviewButton
        $color="orange"
        $shape="oval"
        $size="large"
        onClick={handleClick}
      >
        {t("addReview")}
      </PostReviewButton>

      <AddReviewModal />
    </>
  );
};
