import { Column } from "../../Util/Column";
import styled from "styled-components";
import { Button } from "../../Util/Button";
import { SellerNavigationButtons } from "./SellerNavigationButtons";
import { Modal } from "../../Util/Modal";
import { AddProductModal } from "./AddProductModal";

const AddProductButton = styled(Button)`
  align-self: center;
  margin-top: 2.4rem;
`;

export const DashboardSellerList = () => {
  const { setIsOpen } = Modal.useModalContext();

  const handleClick = () => setIsOpen(true);

  return (
    <Column $gap="1.2rem">
      <SellerNavigationButtons />

      <AddProductButton
        $color="orange"
        $shape="oval"
        $size="medium"
        onClick={handleClick}
      >
        Add Product
      </AddProductButton>

      <AddProductModal />
    </Column>
  );
};
