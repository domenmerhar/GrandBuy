import styled from "styled-components";
import { SquareButton } from "../../Util/SquareButton";

interface ButtonWithNotifcationsProps {
  notificationCount?: number;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonHolder = styled.div`
  position: relative;
  gap: 6.4rem;
`;

const Notification = styled.div`
  position: absolute;
  left: 3.5rem;
  top: -1rem;
  z-index: 1;
  background-color: var(--red);
  color: var(--gray-light-0);
  border-radius: 50%;
  width: 3.6rem;
  height: 3.6rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * ButtonWithNotifcations komponenta za prikaz gumba z obvestili.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {number} [props.notificationCount] - Število obvestil, ki jih želimo prikazati.
 * @param {React.ReactNode} props.children - Vsebina gumba.
 * @param {function} [props.onClick] - Funkcija, ki se izvede ob kliku na gumb.
 * @returns {JSX.Element} - JSX element gumba z obvestili.
 *
 * @example
 * // Uporaba komponente
 * <ButtonWithNotifcations notificationCount={5} onClick={() => console.log('Klik')}>
 * <svg>...</svg>
 * </ButtonWithNotifcations>
 */

export const ButtonWithNotifcations: React.FC<ButtonWithNotifcationsProps> = ({
  notificationCount,
  children,
  onClick,
}) => {
  return (
    <ButtonHolder>
      {notificationCount && notificationCount > 0 ? (
        <Notification>
          {notificationCount > 99 ? `${99}+` : notificationCount}
        </Notification>
      ) : null}
      <SquareButton $size="large" $color="white" onClick={onClick}>
        {children}
      </SquareButton>
    </ButtonHolder>
  );
};
