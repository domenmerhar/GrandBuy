import { FC, useState } from "react";
import styled from "styled-components";
import { Row } from "./Row";
import { Button } from "./Button";
import { Column } from "./Column";
import { Backdrop } from "./Backdrop";

interface ModalProps {
  title?: string;
  children?: string;

  onSubmit?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
  onCancel?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
}

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  border-radius: 10px;
  background-color: var(--gray-2);

  font-size: 1.4rem;

  width: 40rem;
  height: 30rem;

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
`;

const Content = styled.p`
  margin: 0.4rem 0.6rem;
  height: 100%;
  font-weight: 600;

  & ~ div {
    margin-left: auto;
  }
`;

export const Modal: FC<ModalProps> = ({
  title,
  children,
  onCancel,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onCancel) onCancel(e);
    setIsOpen(false);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onSubmit) onSubmit(e);
    setIsOpen(true);
  };

  const handleBackdropClick = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <>
      <StyledModal>
        <Header>
          <Title>{title}</Title>
        </Header>

        <Column>
          <Content>{children}</Content>

          <Row $gap="1.2rem" $alignItems="center">
            <Button
              $color="gray"
              $shape="oval"
              $size="medium"
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              $color="orange"
              $shape="oval"
              $size="medium"
              onSubmit={handleSubmit}
            >
              Submit
            </Button>
          </Row>
        </Column>
      </StyledModal>
      <Backdrop onClick={handleBackdropClick} />
    </>
  );
};
