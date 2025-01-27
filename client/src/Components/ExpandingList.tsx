import React, {
  useState,
  createContext,
  useContext,
  cloneElement,
  useEffect,
  useCallback,
  LegacyRef,
} from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface Coordinates {
  x: number;
  y: number;
}

interface ChildrenProps {
  children: React.ReactNode[] | React.ReactNode;
}

interface ButtonProps {
  children: React.ReactNode;
}

interface ContextType {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  position: Coordinates;
  setPosition: React.Dispatch<React.SetStateAction<Coordinates>>;
  close: () => void;
}

const expandingListContext = createContext<ContextType>({} as ContextType);

export const ExpandingList = ({ children }: ChildrenProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<Coordinates>({ x: 0, y: 0 });

  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  useEffect(() => {
    document.addEventListener("scroll", close);

    return () => {
      document.removeEventListener("scroll", close);
    };
  }, [close]);

  return (
    <expandingListContext.Provider
      value={{ isOpen, setIsOpen, position, setPosition, close }}
    >
      {children}
    </expandingListContext.Provider>
  );
};

const Div = styled.div<Coordinates>`
  position: fixed;
  z-index: 1000;

  left: ${(props) => `${props.x}px`};
  top: ${(props) => `${props.y}px`};
`;

const Button: React.FC<ButtonProps> = ({ children }) => {
  const { setIsOpen, setPosition } = useContext(expandingListContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = (e.target as Element)
      .closest("button")!
      .getBoundingClientRect();

    setPosition({
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
    });

    setIsOpen!((prev: boolean) => !prev);
  };

  return (
    <>
      {children
        ? cloneElement(children as React.ReactElement, {
            onClick: handleClick,
          })
        : null}
    </>
  );
};

export type listClickType = () => void;

const List: React.FC<ButtonProps> = ({ children }) => {
  const { isOpen, setIsOpen, close } = useContext(expandingListContext);
  const { position } = useContext(expandingListContext);

  const ref = useOutsideClick(close);

  const listClick: listClickType = () => setIsOpen!(false);

  if (!isOpen) return null;

  return (
    <Div x={position.x} y={position.y} ref={ref as LegacyRef<HTMLDivElement>}>
      {cloneElement(children as React.ReactElement, { listClick })}
    </Div>
  );
};

const Ul = styled.ul`
  list-style: none;
  background-color: var(--gray-1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  width: 250px;

  & :first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  & :last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const Li = styled.li`
  padding: 10px 20px;
  color: var(--gray-8);

  display: flex;
  align-items: center;
  gap: 12px;

  overflow: hidden;
  transition: background-color 200ms;

  & :first-child {
    size: 2px;
    font-size: 24px;
  }

  &:hover {
    background-color: var(--gray-3);
    cursor: pointer;
  }
`;

ExpandingList.Button = Button;
ExpandingList.List = List;
ExpandingList.Ul = Ul;
ExpandingList.Li = Li;

export default ExpandingList;
