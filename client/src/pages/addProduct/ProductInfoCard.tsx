import styled from "styled-components";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { ProductInfo } from "../../Components/ProductInfo";
import { ButtonWithNotifcations } from "../../Components/Button/ButtonWithNotifcations";
import { HiPencil } from "react-icons/hi";
import { Modal } from "../../Components/Modal";
import { useSearchParams } from "react-router-dom";
import { ProductInfoModal } from "./ProductInfoModal";
import { useMe } from "../../hooks/useMe";

const ProductInfoHolder = styled(StyledSidebar)`
  align-self: flex-start;
  position: relative;

  & > div:nth-of-type(1) {
    position: absolute;
    top: 2.4rem;
    right: 2.4rem;
    display: inline-block;

    & > button {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }
`;

/**
 * Komponenta za prikaz informacij o izdelku.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja kartico z informacijami o izdelku.
 *
 * @example
 * // Uporaba komponente
 * <ProductInfoCard />
 */

export const ProductInfoCard = () => {
  const [searchParams] = useSearchParams();
  const { setIsOpen } = Modal.useModalContext();
  const { data } = useMe();

  const createdBy = data?.data?.username;

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <ProductInfoHolder $position="sticky" $height="auto" $rounded>
        <ButtonWithNotifcations onClick={handleClick}>
          <HiPencil size={24} />
        </ButtonWithNotifcations>

        <ProductInfo
          title={searchParams.get("title") || ""}
          price={Number(searchParams.get("price") || "")}
          shipping={searchParams.get("shipping") || ""}
          averageRating="0"
          unitsSold="0"
          createdBy={createdBy}
          uploaded={new Date().toLocaleDateString()}
          discount={0}
        />
      </ProductInfoHolder>

      <ProductInfoModal />
    </>
  );
};
