import { HiPlus } from "react-icons/hi";
import { SquareButton } from "../../Util/SquareButton";
import { useAddProductToCard } from "../../hooks/cart/useAddProductToCard";
import { useAuthContext } from "../../contexts/AuthContext";
import { FC } from "react";

interface AddButtonProps {
  productId: string;
}

export const AddButton: FC<AddButtonProps> = ({ productId }) => {
  const { JWT } = useAuthContext();
  const { mutate } = useAddProductToCard();

  const handleClick = () => {
    mutate({ JWT, productId, quantity: 1 });
  };

  return (
    <SquareButton $size="small" $color="orange" onClick={handleClick}>
      <HiPlus color="#f8f9fa" size={24} />
    </SquareButton>
  );
};
