import { Column } from "../../Util/Column";
import styled from "styled-components";
import { Button } from "../../Util/Button";
import { SellerNavigationButtons } from "./SellerNavigationButtons";
import { Modal } from "../Modal";
import { AddProductModal } from "./AddProductModal";
import { useTranslation } from "react-i18next";

const AddProductButton = styled(Button)`
  align-self: center;
  margin-top: 2.4rem;
`;

/**
 * DashboardAdminList komponenta za prikaz navigacijskega seznama za administratorsko nadzorno ploščo.
 *
 * @component
 * @returns {JSX.Element} - JSX element navigacijskega seznama za administratorsko nadzorno ploščo.
 *
 * @example
 * // Uporaba komponente
 * <DashboardAdminList />
 */

export const DashboardSellerList = () => {
  const { t } = useTranslation();
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
        {t("addProduct")}
      </AddProductButton>

      <AddProductModal />
    </Column>
  );
};
