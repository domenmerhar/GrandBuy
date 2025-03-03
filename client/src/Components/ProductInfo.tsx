import styled from "styled-components";
import { Column } from "../Util/Column";
import { HeaderUppercaseBold } from "../Util/HeaderUppercaseBold";
import { ProductInfoParagraph } from "../pages/product/ProductInfoParagraph";
import { Stepper } from "../Util/Stepper";
import { Button } from "../Util/Button";
import { FC } from "react";
import { Discount } from "../Util/Discount";
import { Row } from "../Util/Row";
import { AddToWishlistButton } from "../pages/product/AddToWishlistButton";
import { useAddProductToCard } from "../hooks/cart/useAddProductToCard";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useMe } from "../hooks/useMe";
import { useIsSellingProduct } from "../hooks/products/useIsSellingProduct";
import { useDeleteProduct } from "../hooks/products/useDeleteProduct";
import { useTranslation } from "react-i18next";
import ExpandingList from "./ExpandingList";
import ExpandingThreeDotsButton from "./ExpandingThreeDotsButton";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Modal } from "./Modal";

const StyledProductInfo = styled(Column)`
  min-width: 25rem;
  justify-content: flex-start;
`;

const Info = styled(Column)`
  font-size: 2rem;
  position: relative;

  & h2 {
    font-size: 3.6rem;
  }
`;

const StyledDiscount = styled(Discount)`
  right: -20%;
  top: -12.5%;
`;

const HeaderHolder = styled(Row)`
  margin-bottom: 1.6rem;
`;

interface ProductInfoProps {
  title: string;
  price: string;
  shipping: string;
  averageRating: string;
  unitsSold: string;
  createdBy: string;
  uploaded: string;
  discount: number;
}

export const ProductInfo: FC<ProductInfoProps> = ({
  title,
  price,
  shipping,
  averageRating,
  unitsSold,
  createdBy,
  uploaded,
  discount,
}) => {
  const { t } = useTranslation();

  const { JWT } = useAuthContext();
  const { data } = useMe();
  const role = data?.data?.role;

  const { mutate: deleteProduct } = useDeleteProduct();
  const isSellingProduct = useIsSellingProduct();

  const [searchParams] = useSearchParams();
  const quantity = Number(searchParams.get("quantity")) || 1;

  const { productId } = useParams<{ productId: string }>();

  const { mutate } = useAddProductToCard();

  const { setIsOpen } = Modal.useModalContext();

  const handleClick = () => mutate({ JWT, productId: productId!, quantity });

  const handleEdit = () => setIsOpen(true);
  const handleDelete = () => deleteProduct({ JWT, id: productId! });

  return (
    <StyledProductInfo $gap="2.4rem" $justifyContent="space-around">
      <Info $gap=".8rem">
        <HeaderHolder $justifyContent="space-between" $alignItems="center">
          <HeaderUppercaseBold>{title}</HeaderUppercaseBold>

          {role === "user" ? <AddToWishlistButton /> : null}
          {isSellingProduct ? (
            <ExpandingList start="right">
              <ExpandingThreeDotsButton />

              <ExpandingList.List>
                <ExpandingList.Ul>
                  <ExpandingList.Li onClick={handleEdit}>
                    <HiOutlinePencilSquare />
                    {t("edit")}
                  </ExpandingList.Li>
                  <ExpandingList.Li onClick={handleDelete}>
                    <HiOutlineTrash />
                    {t("delete")}
                  </ExpandingList.Li>
                </ExpandingList.Ul>
              </ExpandingList.List>
            </ExpandingList>
          ) : null}
        </HeaderHolder>

        <ProductInfoParagraph title={t("price")} value={price} />
        <ProductInfoParagraph title={t("shipping")} value={shipping} />
        <ProductInfoParagraph
          title={t("averageRating")}
          value={averageRating}
        />
        <ProductInfoParagraph title={t("unitsSold")} value={unitsSold} />
        <ProductInfoParagraph title={t("createdBy")} value={createdBy} />
        <ProductInfoParagraph title={t("uploaded")} value={uploaded} />
        {discount ? <StyledDiscount>-{discount}%</StyledDiscount> : null}
      </Info>

      {role === "user" ? (
        <>
          <Stepper searchParamName="quantity" />

          <Column $gap=".8rem">
            <Button
              $color="orange"
              $shape="oval"
              $size="medium"
              onClick={handleClick}
            >
              {t("addToCart")}
            </Button>

            <Button $color="gray" $shape="oval" $size="medium">
              {t("buyNow")}
            </Button>
          </Column>
        </>
      ) : null}
    </StyledProductInfo>
  );
};
