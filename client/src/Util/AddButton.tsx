import { HiPlus } from "react-icons/hi";
import { SquareButton } from "./SquareButton";

export const AddButton = () => {
  return (
    <SquareButton $size="small" $color="orange">
      <HiPlus color="#f8f9fa" size={24} />
    </SquareButton>
  );
};
