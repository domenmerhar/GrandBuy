import { createContext, FC, useContext, useState, ReactNode } from "react";
import styled from "styled-components";
import { Row } from "./Row";
import { Button } from "./Button";
import { Column } from "./Column";
import { Backdrop } from "./Backdrop";
import { createPortal } from "react-dom";
import { ButtonColor } from "./types";

interface ModalButtonProps {
  text: string;
  color: ButtonColor;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
}
interface ModalProps {
  title?: string;
  children?: string | ReactNode | ReactNode[];

  negativeButton?: ModalButtonProps;
  positiveButton?: ModalButtonProps;

  onClose?: () => unknown;
}

const StyledModal = styled.div`
  position: fixed;
  display: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  border-radius: 10px;
  background-color: var(--gray-2);

  display: flex;
  flex-direction: column;

  font-size: 1.4rem;

  min-height: 38rem;
  min-width: 55rem;

  max-height: 80vh;
  max-width: 90vw;

  overflow: hidden;

  & > :last-child {
    height: 80%;
  }

  & > *,
  h1 {
    padding: 0.4rem 0.8rem;
  }
`;

const Header = styled.div`
  background: linear-gradient(45deg, var(--orange-6), var(--orange-5));
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  min-height: 4.8rem;
  display: flex;
  justify-content: space-between;

  padding: 0.8rem 1.6rem;
`;

const Title = styled.h1`
  color: var(--gray-1);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Content = styled.div`
  margin: 0.8rem 1.2rem;
  height: 100%;
  font-weight: 600;

  & ~ div {
    margin-left: auto;
  }
`;

const ModalContext = createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

interface ModalComponent extends FC<{ children: ReactNode }> {
  useModalContext: typeof useModalContext;
  Window: FC<ModalProps>;
}

const Modal: ModalComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a Modal component");
  }

  return context;
};

const MainColumn = styled(Column)`
  flex: 0.9;
  overflow-y: auto;
`;

const ButtonsRow = styled(Row)`
  margin-top: auto;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--gray-1);
  font-weight: 800;
  font-size: 2.4rem;
  text-transform: uppercase;

  transition: all 200ms;

  &:hover {
    transform: scale(1.1);
  }
`;

const Window: FC<ModalProps> = ({
  title,
  children,

  negativeButton,
  positiveButton,

  onClose,
}) => {
  const { isOpen, setIsOpen } = useModalContext();

  const closeAfterCallback = (callback?: () => unknown) => () => {
    if (callback) callback();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const negativeButtonColor = negativeButton?.color;
  const negativeButtonText = negativeButton?.text;
  const onNegativeClick = negativeButton?.onClick;
  const negativeButtonExists =
    negativeButtonColor && negativeButtonText && onNegativeClick;

  const positiveButtonColor = positiveButton?.color;
  const positiveButtonText = positiveButton?.text;
  const onPositiveClick = positiveButton?.onClick;
  const positiveButtonExists =
    positiveButtonColor && positiveButtonText && onPositiveClick;

  return createPortal(
    <>
      <StyledModal>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={closeAfterCallback(onClose)}>x</CloseButton>
        </Header>

        <MainColumn>
          <Content>{children}</Content>
          {positiveButtonExists || negativeButtonExists ? (
            <ButtonsRow $gap="1.2rem" $alignItems="center">
              {negativeButtonExists ? (
                <Button
                  $color={negativeButtonColor}
                  $shape="oval"
                  $size="medium"
                  onClick={closeAfterCallback(onNegativeClick)}
                >
                  {negativeButtonText}
                </Button>
              ) : null}

              {positiveButtonExists ? (
                <Button
                  $color={positiveButtonColor}
                  $shape="oval"
                  $size="medium"
                  onClick={closeAfterCallback(onPositiveClick)}
                >
                  {positiveButtonText}
                </Button>
              ) : null}
            </ButtonsRow>
          ) : null}
        </MainColumn>
      </StyledModal>
      <Backdrop onClick={closeAfterCallback(onClose)} />
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

Modal.Window = Window;
Modal.useModalContext = useModalContext;

export { Modal };
