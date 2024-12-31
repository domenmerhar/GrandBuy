import React, { FC } from "react";
import styled from "styled-components";

import {
  ScrollMenu,
  VisibilityContext,
  type publicApiType,
} from "react-horizontal-scrolling-menu";

import "react-horizontal-scrolling-menu/dist/styles.css";
import { ProductCard } from "../../Util/ProductCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { ArrowButton } from "../../Util/ArrowButton";
import { IProductShort } from "../../Util/types";
import { toApiFilesPath } from "../../functions/toApiFilesPath";

interface HorizontalProductsProps {
  products: IProductShort[];
}

export const HorizontalProducts: FC<HorizontalProductsProps> = ({
  products,
}) => {
  return (
    <NoScrollbar>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {products.map(({ _id, name, coverImage, discount, totalPrice }) => (
          <ProductCard
            id={_id}
            key={_id}
            title={name}
            image={toApiFilesPath(coverImage)}
            discount={discount}
            price={totalPrice}
          />
        ))}
      </ScrollMenu>
    </NoScrollbar>
  );
};

export default HorizontalProducts;

const NoScrollbar = styled.div`
  & .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }

  & .react-horizontal-scrolling-menu--scroll-container {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  & .react-horizontal-scrolling-menu--item {
    margin: 0 0.8rem;
  }
`;

function LeftArrow() {
  const visibility = React.useContext<publicApiType>(VisibilityContext);
  const disabled = visibility.useLeftArrowVisible();

  return (
    <Arrow
      disabled={disabled}
      onClick={() => visibility.scrollPrev()}
      testId="left-arrow"
    >
      <HiChevronLeft />
    </Arrow>
  );
}

function RightArrow() {
  const visibility = React.useContext<publicApiType>(VisibilityContext);
  const disabled = visibility.useRightArrowVisible();

  return (
    <Arrow
      disabled={disabled}
      onClick={() => visibility.scrollNext()}
      testId="right-arrow"
    >
      <HiChevronRight />
    </Arrow>
  );
}

interface ArrowProps {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
  className?: string;
  testId: string;
}

function Arrow({ children, disabled, onClick, className, testId }: ArrowProps) {
  return (
    <ArrowButton
      $size="medium"
      disabled={disabled}
      onClick={onClick}
      className={"arrow" + `-${className}`}
      data-testid={testId}
    >
      {children}
    </ArrowButton>
  );
}
