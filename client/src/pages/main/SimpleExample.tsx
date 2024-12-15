import React from "react";
import styled from "styled-components";

import {
  ScrollMenu,
  VisibilityContext,
  type publicApiType,
} from "react-horizontal-scrolling-menu";

import "react-horizontal-scrolling-menu/dist/styles.css";

export function SimpleExample() {
  const [items] = React.useState(() => getItems());
  const [selected, setSelected] = React.useState<string[]>([]);

  const isItemSelected = (id: string): boolean =>
    !!selected.find((el) => el === id);

  const handleItemClick = (itemId: string) => {
    const itemSelected = isItemSelected(itemId);

    setSelected((currentSelected: string[]) =>
      itemSelected
        ? currentSelected.filter((el) => el !== itemId)
        : currentSelected.concat(itemId)
    );
  };

  return (
    <div>
      <NoScrollbar>
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {items.map(({ id }) => (
            <Card
              title={id}
              itemId={id} // NOTE: itemId is required for track items
              key={id}
              onClick={() => handleItemClick(id)}
              selected={isItemSelected(id)}
            />
          ))}
        </ScrollMenu>
      </NoScrollbar>
    </div>
  );
}

export default SimpleExample;

const NoScrollbar = styled.div`
  & .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }
  & .react-horizontal-scrolling-menu--scroll-container {
    scrollbar-width: none;
    -ms-overflow-style: none;
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
      Left
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
      Right
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

const ArrowButton = styled.button<{ disabled: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2px;
  opacity: ${(props) => (props.disabled ? "0" : "1")};
  user-select: none;
  border-radius: 6px;
  border-width: 1px;
`;

function Arrow({ children, disabled, onClick, className, testId }: ArrowProps) {
  return (
    <ArrowButton
      disabled={disabled}
      onClick={onClick}
      className={"arrow" + `-${className}`}
      data-testid={testId}
    >
      {children}
    </ArrowButton>
  );
}

interface CardProps {
  onClick: (context: publicApiType) => void;
  selected: boolean;
  title: string;
  itemId: string;
}

const CardBody = styled.div<{ visible: boolean; selected: boolean }>`
  border: 1px solid;
  display: inline-block;
  margin: 0 10px;
  width: 160px;
  user-select: none;
  border-radius: 8px;
  overflow: hidden;

  & .header {
    background-color: white;
  }

  & .visible {
    background-color: ${(props) => (props.visible ? "transparent" : "gray")};
  }

  & .background {
    background-color: ${(props) => (props.selected ? "green" : "bisque")};
    height: 200px;
  }
`;

function Card({ onClick, selected, title, itemId }: CardProps) {
  const visibility = React.useContext<publicApiType>(VisibilityContext);
  const isVisible = visibility.useIsVisible(itemId, true);

  return (
    <CardBody
      data-cy={itemId}
      onClick={() => onClick(visibility)}
      onKeyDown={(ev: React.KeyboardEvent) => {
        if (ev.code === "Enter") {
          onClick(visibility);
        }
      }}
      data-testid="card"
      role="button"
      tabIndex={0}
      className="card"
      visible={isVisible}
      selected={selected}
    >
      <div className="header">
        <div>{title}</div>
        <div className="visible">visible: {JSON.stringify(isVisible)}</div>
        <div className="selected">selected: {JSON.stringify(!!selected)}</div>
      </div>
      <div className="background" />
    </CardBody>
  );
}

const getId = (index: number) => `test${index}`;

const getItems = () =>
  Array(10)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));
