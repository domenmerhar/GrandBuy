import { HiOutlineHeart } from "react-icons/hi";
import styled from "styled-components";
import { useAddToWishlist } from "../../hooks/wishlist/useAddToWishlist";
import { useRemoveFromWishlist } from "../../hooks/wishlist/useRemoveFromWishlist";
import { useWishlistItemByProductId } from "../../hooks/wishlist/useWishlistItemByProductId";
import { useAuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";

interface ButtonProps {
  $active: boolean;
}

const StyledAddToWishlistButton = styled.button<ButtonProps>`
  background-color: transparent;
  border: none;

  & svg {
    width: 4.4rem;
    height: 4.4rem;
    stroke: var(--gray-7);

    ${({ $active }) => $active && "stroke: var(--red); fill: var(--red);"}
    transition: all 200ms;
  }
`;

export const AddToWishlistButton = () => {
  const { JWT } = useAuthContext();
  const { productId } = useParams<{ productId: string }>();

  const { mutate: addToWishlist } = useAddToWishlist(productId!);
  const { mutate: removeFromWishlist } = useRemoveFromWishlist(productId!);
  const { data } = useWishlistItemByProductId(productId!);

  const onWishlist = data?.status === "success";
  return (
    <StyledAddToWishlistButton
      onClick={() => {
        if (onWishlist)
          return removeFromWishlist({ productId: productId!, JWT });

        addToWishlist({ productId: productId!, JWT });
      }}
      $active={onWishlist}
    >
      <HiOutlineHeart />
    </StyledAddToWishlistButton>
  );
};
