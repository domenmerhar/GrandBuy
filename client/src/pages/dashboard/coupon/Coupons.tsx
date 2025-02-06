import { getCouponsSeller } from "../../../api/coupon/getCouponsSeller";
import { InfiniteProducts } from "../../../Components/InfiniteProducts";
import { useInfinite } from "../../../hooks/useInfinite";
import { useJWT } from "../../../hooks/useJWT";
import { useMe } from "../../../hooks/useMe";
import { useSearchParams } from "react-router-dom";
import { ICoupon, SortCreatedAt, SortDiscount } from "../../../Util/types";
import { Coupon } from "./Coupon";
import { toDate } from "../../../functions/toDate";

export const Coupons = () => {
  const { JWT } = useJWT();
  const { data: dataMe } = useMe();
  const [searchParams] = useSearchParams();

  const userId = dataMe?.data?._id;

  const sortStr = searchParams.get("sort")!;
  const sort = ["+createdAt", "-createdAt", "+discount", "-discount"].includes(
    sortStr
  )
    ? (sortStr as SortCreatedAt | SortDiscount)
    : "+createdAt";

  const queryFn = ({ pageParam }: { pageParam: unknown }) => {
    if (pageParam === null) return;

    return getCouponsSeller({
      page: Number(pageParam),
      sort,
      JWT: JWT,
    });
  };

  const data = useInfinite({
    queryFn,
    queryKey: ["couponsSeller", userId, sort],
  });

  const renderFn = ({ data }: { data: { coupons: ICoupon[] } }) => {
    return data?.coupons?.map(
      ({ _id, code, expireAt, discount, products }: ICoupon) => (
        <Coupon
          key={_id}
          affectedItems={products}
          code={code}
          validUntil={toDate(expireAt)}
          discount={discount}
        />
      )
    );
  };

  return <InfiniteProducts {...data} renderFn={renderFn} />;
};
