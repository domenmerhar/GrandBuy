import { useProduct } from "../../pages/product/useProduct";
import { useMe } from "../useMe";

export const useIsSellingProduct = () => {
  const { data: userData } = useMe();
  const { data: productData } = useProduct();

  const userId = userData?.data?._id;
  const sellerId = productData?.data?.product?.user?._id;

  if (!userId && !sellerId) return false;

  return sellerId === userId;
};
