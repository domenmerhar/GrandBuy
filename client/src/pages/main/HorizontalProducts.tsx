import React from "react";
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

export function HorizontalProducts() {
  const [items] = React.useState(() => getItems());
  return (
    <NoScrollbar>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {items.map(({ id: index }) => (
          <ProductCard
            id={`${index}`}
            key={index}
            price={(+index + 1) * 10 - 0.01}
            discount={+index * 5}
            image="data:image/webp;base64,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"
            title={`Proudct number ${index + 1}`}
          />
        ))}
      </ScrollMenu>
    </NoScrollbar>
  );
}

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

const getId = (index: number) => `test${index}`;

const getItems = () =>
  Array(10)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));
