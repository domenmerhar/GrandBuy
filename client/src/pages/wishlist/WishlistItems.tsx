import React from "react";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { useWishlistItems } from "../../hooks/wishlist/useWishlistItems";
import { ErrorBox } from "../../Components/ErrorBox";
import { WishlistItem } from "../../Util/types";
import { CartItem } from "../Cart/CartItem";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { toPrice } from "../../functions/toPrice";

export const WishlistItems = () => {
  const { data, isLoading, error } = useWishlistItems();

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <>
      {data?.data?.wishlistItems?.map(
        ({ _id, coverImage, name, totalPrice }: WishlistItem) => (
          <CartItem
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores veniam quisquam est incidunt unde vero perferendis culpa reiciendis. Eum officia natus sapiente nostrum alias necessitatibus labore. Placeat consequatur reprehenderit beatae."
            key={_id}
            image={toApiFilesPath(coverImage)}
            name={name}
            price={toPrice(totalPrice, "USD")}
          />
        )
      )}
    </>
  );
};
