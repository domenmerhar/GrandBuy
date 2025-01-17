import { FC } from "react";
import styled from "styled-components";
import { Backdrop } from "../../Util/Backdrop";
import { BurgerMenuThemeExit } from "./BurgerMenuThemeExit";
import { useAuthContext } from "../../contexts/AuthContext";
import { BurgerMenuNavigationList } from "./BurgerMenuNavigationList";

const StyledBurgerMenu = styled.aside`
  height: 93vh;
  background-color: var(--gray-9);
  position: fixed;
  right: 0;
  top: 75px;
  width: 30rem;
  padding: 2.4rem;

  display: flex;
  gap: 3.2rem;
  flex-direction: column;
`;

const UserHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

const UserImage = styled.img`
  width: 9.2rem;
  height: 9.2rem;
  border-radius: 50%;
`;

const UserText = styled.p`
  color: var(--gray-2);
  letter-spacing: 1px;
  font-weight: 600;
  text-transform: capitalize;
  font-size: 3.6rem;
`;

interface BurgerMenuProps {
  isOpen: boolean;
  handleClose: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const BurgerMenu: FC<BurgerMenuProps> = ({ isOpen, handleClose }) => {
  const [{ username }] = useAuthContext();

  return (
    isOpen && (
      <>
        <Backdrop onClick={handleClose} />
        <StyledBurgerMenu>
          <UserHolder>
            <UserImage
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAwYCB//EADEQAQACAQIDBwIDCQAAAAAAAAABAgMEESExUQUSIjJBYXEjUhMUwRUzYoGRoaKx0f/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APoIDo5gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9232z/QGAAAAAAAAAAAAAAAAAAAAASdHpLam2/lxxzt/wABqw4cme/dx13n/SywdmY67Tmnvz0jhCZixUw0imOu1Ye2dakeaY6Y42x0rX4jZ73YEV4yYseSPqUrb5hEzdmYr7zimaT05wnAKDUaXNp/PXw/dHGGl0s8Y2nkr9X2bW299P4bfZ6T8NSs2KoZtE0tNbRMTHOJFRgAAABmtbXtFaxMzPpEMLzQaeuHBWdvHaN7T+iWrIq/yOp23/Bnb5homJrMxaJiY5xLpEPtPT1yYZyxHjpG+/WDVxTAKyAAA94cVs2WuOnOf7A26PTW1OTblSPNK8pSuOkUpG1Y5Q84MVcGKMdOUevV7ZtakAEUAAAAAA2iecQwyA5oBtgAAdDp7xkwUvXlNXPJGk1l9NO0R3qTzrKWLKvWjXXimkyzPrXux/NG/auPb91ffpwQdVqsmptE34VjlWPRJFtaAGmQABd9n6b8vi3tH1Lc/b2Q+y9N37/jXjw1nw+8rZm1qQARQAAAAAAAAAFVbsrJHky1n5jZFzaXPh43xzt1jjC/F1Mc0LvUaDDm3msdy/WsfoqtRpsunttkrw9LRyldTGkBUAAAAG3TYbZ80Y6+vOekNS80Gm/L4vFH1Lcbe3slqyJFKVx0ilI2rEbQyDLQAAAAAAAAAAAAAAxatb1mt4iazziWQFRrOz7Yt74d7U9Y9YQXSq/XaCL75MEbW9a9fhZUsVQTG07TwkaZAS9Bo51Fu/eNsUf5ewN3Zel70xnyRwjyR191oREREREbRHKBhuAAAAAAAAAAAAAAAAAAAAIur0VNR4qz3MnXr8oE9m6iJ2iKz7xZci6mK7T9mRExbPaLfw15LGIiIiIiIiOUQCKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z"
              alt="profile icon"
            />
            <UserText>Hello {username}</UserText>
          </UserHolder>

          <BurgerMenuNavigationList />

          <BurgerMenuThemeExit />
        </StyledBurgerMenu>
      </>
    )
  );
};
