import { HiOutlineTrash } from "react-icons/hi";
import { SquareButton } from "../../Util/SquareButton";
import { FC } from "react";

interface DeleteButtonProps {
  handleDelete: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => unknown;
  size: "small" | "medium" | "large";
}

/**
 * DeleteButton komponenta za prikaz gumba za brisanje.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {function} props.handleDelete - Funkcija, ki se izvede ob kliku na gumb za brisanje.
 * @param {"small" | "medium" | "large"} props.size - Velikost gumba.
 * @returns {JSX.Element} - JSX element gumba za brisanje.
 *
 * @example
 * // Uporaba komponente
 * <DeleteButton handleDelete={() => console.log('Izbrisano')} size="medium" />
 */

export const DeleteButton: FC<DeleteButtonProps> = ({ handleDelete, size }) => {
  return (
    <SquareButton $color="red" $size={size} onClick={handleDelete}>
      <HiOutlineTrash />
    </SquareButton>
  );
};
