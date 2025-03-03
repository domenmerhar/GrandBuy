import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { useWishlistItems } from "../../hooks/wishlist/useWishlistItems";
import { ErrorBox } from "../../Components/ErrorBox";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { toPrice } from "../../functions/toPrice";
import { WishlistItem } from "./WishlistItem";
import { WishlistItemInterface } from "../../Util/types";

/**
 * Komponenta za prikaz elementov na seznamu želja.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja elemente na seznamu želja.
 *
 * @example
 * // Uporaba komponente
 * <WishlistItems />
 */

export const WishlistItems = () => {
  const { data, isLoading, error } = useWishlistItems();

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <>
      {data?.data?.wishlistItems?.map(
        ({
          _id,
          productId,
          coverImage,
          name,
          totalPrice,
        }: WishlistItemInterface) => (
          <WishlistItem
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores veniam quisquam est incidunt unde vero perferendis culpa reiciendis. Eum officia natus sapiente nostrum alias necessitatibus labore. Placeat consequatur reprehenderit beatae."
            key={_id}
            image={toApiFilesPath(coverImage)}
            name={name}
            price={toPrice(totalPrice, "USD")}
            productId={productId}
          />
        )
      )}
    </>
  );
};
