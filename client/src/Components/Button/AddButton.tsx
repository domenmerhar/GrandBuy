import { HiPlus } from "react-icons/hi";
import { SquareButton } from "../../Util/SquareButton";
import { useAddProductToCard } from "../../hooks/cart/useAddProductToCard";
import { useAuthContext } from "../../contexts/AuthContext";
import { FC } from "react";

interface AddButtonProps {
  productId: string;
}

/**
 * AddButton komponenta za dodajanje izdelka v košarico.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {string} props.productId - ID izdelka, ki ga želimo dodati v košarico.
 * @returns {JSX.Element} - JSX element gumba za dodajanje izdelka v košarico.
 *
 * @example
 * // Uporaba komponente
 * <AddButton productId="123456" />
 */

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
