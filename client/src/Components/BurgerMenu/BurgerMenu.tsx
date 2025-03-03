import { FC } from "react";
import styled from "styled-components";
import { Backdrop } from "../../Util/Backdrop";
import { BurgerMenuThemeExit } from "./BurgerMenuThemeExit";
import { BurgerMenuNavigationList } from "./BurgerMenuNavigationList";
import { useMe } from "../../hooks/useMe";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toApiFilesPath } from "../../functions/toApiFilesPath";

const StyledBurgerMenu = styled.aside`
  height: 95vh;
  background-color: var(--gray-light-9);
  position: fixed;
  right: 0;
  top: 75px;
  width: 30rem;
  padding: 2.4rem;
  z-index: 4;

  display: flex;
  gap: 3.2rem;
  flex-direction: column;

  color: var(--gray-light-2);

  body.dark-mode & * {
    color: var(--gray-light-2);
    stroke: var(--gray-light-2);
  }

  @media (max-width: 64em) {
    top: 50px;
  }
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

  background-color: var(--gray-6);
`;

const UserText = styled.p`
  letter-spacing: 1px;
  font-weight: 600;
  text-transform: capitalize;
  font-size: 3.6rem;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;

interface BurgerMenuProps {
  isOpen: boolean;
  handleClose: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * BurgerMenu komponenta za prikaz stranskega menija.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {boolean} props.isOpen - Ali je meni odprt.
 * @param {function} props.handleClose - Funkcija za zapiranje menija.
 * @returns {JSX.Element | null} - JSX element ali null, če meni ni odprt.
 *
 * @example
 * // Uporaba komponente
 * <BurgerMenu isOpen={true} handleClose={() => {}} />
 */

export const BurgerMenu: FC<BurgerMenuProps> = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();

  const { data } = useMe();

  const username = data?.data?.username;
  const role = data?.data?.role;
  const id = data?.data?._id;
  const image = data?.data?.image;

  const userProfileUrl = `/account/${role === "seller" ? "seller" : "user"}/${id}`;

  return isOpen ? (
    <>
      <Backdrop onClick={handleClose} />
      <StyledBurgerMenu>
        <UserHolder>
          <Link to={userProfileUrl}>
            <UserImage src={toApiFilesPath(image)} alt="profile icon" />
          </Link>
          <UserText>
            {t("hello")} {username}
          </UserText>
        </UserHolder>

        <BurgerMenuNavigationList />

        <BurgerMenuThemeExit />
      </StyledBurgerMenu>
    </>
  ) : null;
};
