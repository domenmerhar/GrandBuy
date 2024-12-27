import { createContext, FC, useContext, useState, ReactNode } from "react";
import styled from "styled-components";
import { Row } from "./Row";
import { Button } from "./Button";
import { Column } from "./Column";
import { Backdrop } from "./Backdrop";
import { createPortal } from "react-dom";

interface ModalProps {
  title?: string;
  children?: string | ReactNode | ReactNode[];
  type?: "submitApprove" | "cancelReject";

  onSubmitApprove?: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => unknown;

  onCancelReject?: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => unknown;

  onBackdropClick?: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => unknown;
}

const StyledModal = styled.div`
  position: fixed;
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

  padding: 0.4rem 0.6rem;
`;

const Title = styled.h1`
  color: var(--gray-1);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Content = styled.div`
  margin: 0.4rem 0.6rem;
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

const Window: FC<ModalProps> = ({
  title,
  type = "submitApprove",
  children,
  onCancelReject,
  onSubmitApprove,
  onBackdropClick,
}) => {
  const { isOpen, setIsOpen } = useModalContext();

  const handleCancelReject = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (onCancelReject) onCancelReject(e);
    setIsOpen(false);
  };

  const handleSubmitApprove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (onSubmitApprove) onSubmitApprove(e);

    setIsOpen(false);
  };

  const handleBackdropClick = () => {
    if (onBackdropClick) onBackdropClick();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <StyledModal>
        <Header>
          <Title>{title}</Title>
        </Header>

        <MainColumn>
          <Content>{children}</Content>

          <ButtonsRow $gap="1.2rem" $alignItems="center">
            <Button
              $color={type === "submitApprove" ? "gray" : "red"}
              $shape="oval"
              $size="medium"
              onClick={handleCancelReject}
            >
              Cancel
            </Button>

            <Button
              $color={type === "submitApprove" ? "orange" : "gray"}
              $shape="oval"
              $size="medium"
              onClick={handleSubmitApprove}
            >
              Submit
            </Button>
          </ButtonsRow>
        </MainColumn>
      </StyledModal>
      <Backdrop onClick={handleBackdropClick} />
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

Modal.Window = Window;
Modal.useModalContext = useModalContext;

export { Modal };
