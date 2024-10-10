import styled from "styled-components";
import { SquareButton } from "./SquareButton";

interface ButtonWithNotifcationsProps {
  notificationCount?: number;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonHolder = styled.div`
  position: absolute;
`;

const Notification = styled.div`
  position: relative;
  z-index: 1;
  top: 20px;
  left: 40px;
  background-color: var(--red);
  color: var(--gray-0);
  border-radius: 50%;
  width: 3.6rem;
  height: 3.6rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonWithNotifcations: React.FC<ButtonWithNotifcationsProps> = ({
  notificationCount,
  children,
  onClick,
}) => {
  return (
    <ButtonHolder>
      {notificationCount && (
        <Notification>
          {notificationCount > 99 ? `${99}+` : notificationCount}
        </Notification>
      )}
      <SquareButton $size="large" $color="white" onClick={onClick}>
        {children}
      </SquareButton>
    </ButtonHolder>
  );
};
