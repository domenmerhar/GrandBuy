import { createContext, FC, useContext, useState, ReactNode } from "react";
import styled from "styled-components";
import { Row } from "../Util/Row";
import { Button } from "../Util/Button";
import { Column } from "../Util/Column";
import { Backdrop } from "../Util/Backdrop";
import { createPortal } from "react-dom";
import { ButtonColor } from "../Util/types";

interface ModalButtonProps {
  key: string;
  text: string;
  color: ButtonColor;
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
}
interface ModalProps {
  title?: string;
  children?: string | ReactNode | ReactNode[];
  buttons?: ModalButtonProps[];

  onClose?: () => unknown;
}

const StyledModal = styled.div`
  position: fixed;
  display: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

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
  closeModal: () => void;
} | null>(null);

interface ModalComponent extends FC<{ children: ReactNode }> {
  useModalContext: typeof useModalContext;
  Window: FC<ModalProps>;
}

/**
 * Modal komponenta za prikaz modalnega okna.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {ReactNode} props.children - Vsebina modalnega okna.
 * @returns {JSX.Element} - JSX element modalnega okna.
 *
 * @example
 * // Uporaba komponente
 * <Modal>
 * <Modal.Window title="Naslov modalnega okna">
 * <p>Vsebina modalnega okna.</p>
 * <Button onClick={() => console.log('Klik')}>Zapri</Button>
 * </Modal.Window>
 * </Modal>
 */

const Modal: ModalComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, closeModal }}>
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
  flex: 1;
  overflow-y: auto;
`;

const ButtonsRow = styled(Row)`
  margin: 0.8rem 1.2rem;
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

  buttons,
  onClose,
}) => {
  const { isOpen, setIsOpen } = useModalContext();

  const closeAfterCallback = (callback?: () => unknown) => () => {
    if (callback) callback();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <StyledModal>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={closeAfterCallback(onClose)}>x</CloseButton>
        </Header>

        <MainColumn>
          <Content>{children}</Content>
          {buttons?.length ? (
            <ButtonsRow $gap="1.2rem" $alignItems="center">
              {buttons.map(({ key, text, color, onClick }) => (
                <Button
                  key={key}
                  $color={color}
                  $shape="oval"
                  $size="medium"
                  onClick={onClick}
                >
                  {text}
                </Button>
              ))}
            </ButtonsRow>
          ) : null}
        </MainColumn>
      </StyledModal>
      <Backdrop onClick={closeAfterCallback(onClose)} />
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

/**
 * useModalContext hook za dostop do konteksta modalnega okna.
 *
 * @returns {object} - Kontekst modalnega okna.
 * @throws {Error} - Če se hook uporablja izven komponente Modal.
 */

Modal.useModalContext = useModalContext;

/**
 * Modal.Window komponenta za prikaz vsebine modalnega okna.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {string} [props.title] - Naslov modalnega okna.
 * @param {string | ReactNode | ReactNode[]} [props.children] - Vsebina modalnega okna.
 * @param {ModalButtonProps[]} [props.buttons] - Niz gumbov v modalnem oknu.
 * @param {function} [props.onClose] - Funkcija, ki se izvede ob zapiranju modalnega okna.
 * @returns {JSX.Element | null} - JSX element vsebine modalnega okna ali null, če okno ni odprto.
 *
 * @example
 * // Uporaba komponente
 * <Modal.Window title="Naslov modalnega okna">
 * <p>Vsebina modalnega okna.</p>
 * <Button onClick={() => console.log('Klik')}>Zapri</Button>
 * </Modal.Window>
 */

Modal.Window = Window;

export { Modal };
