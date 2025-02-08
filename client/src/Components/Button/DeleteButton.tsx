import { HiOutlineTrash } from "react-icons/hi";
import { SquareButton } from "../../Util/SquareButton";
import { FC } from "react";

interface DeleteButtonProps {
  handleDelete: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => unknown;
  size: "small" | "medium" | "large";
}

export const DeleteButton: FC<DeleteButtonProps> = ({ handleDelete, size }) => {
  return (
    <SquareButton $color="red" $size={size} onClick={handleDelete}>
      <HiOutlineTrash />
    </SquareButton>
  );
};
