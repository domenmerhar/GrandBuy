import styled from "styled-components";
import { HeaderUppercaseBold } from "./HeaderUppercaseBold";
import { CheckboxWithText } from "../pages/search/CheckboxWithText";
import { SliderFilter } from "../pages/search/SliderFilter";
import { RatingInteractive } from "../pages/search/RatingInteractive";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const ContentHolder = styled.div`
  display: flex;
  flex-direction: column;

  & > h2:not(:first-child) {
    margin-top: 12px;
  }
`;

interface ProductFilterProps {
  freeShipping?: boolean;
  sale?: boolean;
  rating?: boolean;
  price?: boolean;
}

export const ProductFilter: FC<ProductFilterProps> = ({
  freeShipping,
  sale,
  rating,
  price,
}) => {
  const { t } = useTranslation();

  return (
    <ContentHolder>
      {freeShipping ? (
        <>
          <HeaderUppercaseBold>{t("delivery")}</HeaderUppercaseBold>
          <CheckboxWithText id="free-shipping" label={t("freeShipping")} />
        </>
      ) : null}

      {sale ? (
        <>
          <HeaderUppercaseBold>{t("discount")}</HeaderUppercaseBold>
          <CheckboxWithText id="sale" label={t("sale")} />
        </>
      ) : null}

      {rating ? (
        <>
          <HeaderUppercaseBold>{t("rating")}</HeaderUppercaseBold>
          <RatingInteractive />
        </>
      ) : null}

      {price ? (
        <>
          <HeaderUppercaseBold>{t("price")}</HeaderUppercaseBold>
          <SliderFilter />
        </>
      ) : null}
    </ContentHolder>
  );
};
