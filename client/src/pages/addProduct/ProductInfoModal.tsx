import styled from "styled-components";
import { Column } from "../../Util/Column";
import { Modal } from "../../Util/Modal";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { useProductInfoModal } from "./ProductInfoModal.hooks";
import { useTranslation } from "react-i18next";

const Content = styled(Column)`
  & label {
    margin-bottom: -8px;
  }
`;

export const ProductInfoModal = () => {
  const { t } = useTranslation();
  const { saveToSearchParams, titleRef, priceRef, shippingRef } =
    useProductInfoModal();

  return (
    <Modal.Window
      title="Edit Product"
      onBackdropClick={saveToSearchParams}
      onSubmitApprove={saveToSearchParams}
    >
      <Content $gap="1.2rem">
        <InputWithLabel
          id="title"
          placeholder="radio"
          title={t("productName")}
          type="text"
          ref={titleRef}
        />

        <InputWithLabel
          id="price"
          placeholder="10.99"
          title={t("price")}
          type="number"
          ref={priceRef}
        />

        <InputWithLabel
          id="shipping"
          placeholder="2.99"
          title={t("shipping")}
          type="number"
          ref={shippingRef}
        />
      </Content>
    </Modal.Window>
  );
};
