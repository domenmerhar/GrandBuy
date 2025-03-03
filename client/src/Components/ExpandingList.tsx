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

interface ExpandingListProps {
  children: React.ReactNode[] | React.ReactNode;
  start?: "left" | "right";
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
  start?: "left" | "right";
}

const expandingListContext = createContext<ContextType>({} as ContextType);

/**
 * ExpandingList komponenta za ustvarjanje razširljivega seznama.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {React.ReactNode[] | React.ReactNode} props.children - Vsebina razširljivega seznama.
 * @param {"left" | "right"} [props.start="left"] - Smer odpiranja seznama (levo ali desno).
 * @returns {JSX.Element} - JSX element razširljivega seznama.
 *
 * @example
 * // Uporaba komponente
 * <ExpandingList start="right">
 * <ExpandingList.Button><button>Odpri seznam</button></ExpandingList.Button>
 * <ExpandingList.List>
 * <ExpandingList.Ul>
 * <ExpandingList.Li>Element 1</ExpandingList.Li>
 * <ExpandingList.Li>Element 2</ExpandingList.Li>
 * </ExpandingList.Ul>
 * </ExpandingList.List>
 * </ExpandingList>
 */

export const ExpandingList = ({
  children,
  start = "left",
}: ExpandingListProps) => {
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
      value={{ isOpen, setIsOpen, position, setPosition, close, start }}
    >
      {children}
    </expandingListContext.Provider>
  );
};

const Div = styled.div<Coordinates>`
  position: fixed;
  z-index: 2;

  left: ${(props) => `${props.x}px`};
  top: ${(props) => `${props.y}px`};
`;

const Button: React.FC<ButtonProps> = ({ children }) => {
  const { setIsOpen, setPosition, start } = useContext(expandingListContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = (e.target as Element)
      .closest("button")!
      .getBoundingClientRect();

    setPosition({
      x: start === "left" ? rect.x + rect.width / 2 : rect.x - rect.width * 4,
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

/**
 * ExpandingList.List komponenta za prikaz razširljivega seznama.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {React.ReactNode} props.children - Vsebina seznama.
 * @returns {JSX.Element | null} - JSX element seznama ali null, če seznam ni odprt.
 */

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
  width: 25rem;

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
  padding: 1rem 2rem;
  color: var(--gray-8);

  display: flex;
  align-items: center;
  gap: 12px;

  overflow: hidden;
  transition: background-color 200ms;

  & :first-child {
    size: 2px;
    font-size: 2.4rem;
  }

  &:hover {
    background-color: var(--gray-3);
    cursor: pointer;
  }
`;

/**
 * ExpandingList.Button komponenta za ustvarjanje gumba, ki odpira razširljiv seznam.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {React.ReactNode} props.children - Vsebina gumba.
 * @returns {JSX.Element} - JSX element gumba za odpiranje seznama.
 */

ExpandingList.Button = Button;

/**
 * ExpandingList.List komponenta za prikaz razširljivega seznama.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {React.ReactNode} props.children - Vsebina seznama.
 * @returns {JSX.Element | null} - JSX element seznama ali null, če seznam ni odprt.
 */

ExpandingList.List = List;

/**
 * ExpandingList.Ul komponenta za ustvarjanje neurejenega seznama znotraj razširljivega seznama.
 *
 * @component
 * @returns {JSX.Element} - JSX element neurejenega seznama.
 */

ExpandingList.Ul = Ul;

/**
 * ExpandingList.Li komponenta za ustvarjanje elementa seznama znotraj razširljivega seznama.
 *
 * @component
 * @returns {JSX.Element} - JSX element elementa seznama.
 */

ExpandingList.Li = Li;

export default ExpandingList;
