import { getCouponsSeller } from "../../../api/coupon/getCouponsSeller";
import { InfiniteProducts } from "../../../Components/InfiniteProducts";
import { useInfinite } from "../../../hooks/useInfinite";
import { useJWT } from "../../../hooks/useJWT";
import { useMe } from "../../../hooks/useMe";
import { useSearchParams } from "react-router-dom";
import {
  CouponProps,
  ICoupon,
  SortCreatedAt,
  SortDiscount,
} from "../../../Util/types";
import { Coupon } from "./Coupon";
import { toDate } from "../../../functions/toDate";
import styled from "styled-components";
import React from "react";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25ch, 1fr));
  justify-content: space-between;
  gap: 3.2rem;
`;

/**
 * Komponenta za prikaz in upravljanje seznamov kuponov.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {Function} props.setCode - Funkcija za nastavitev kode kupona.
 * @param {Function} props.setDiscount - Funkcija za nastavitev popusta kupona.
 * @param {Function} props.setExpireAt - Funkcija za nastavitev datuma veljavnosti kupona.
 * @param {Function} props.setProductIds - Funkcija za nastavitev ID-jev izdelkov, na katere kupon vpliva.
 * @returns {JSX.Element} JSX element, ki predstavlja seznam kuponov.
 *
 * @example
 * // Uporaba komponente
 * <Coupons
 *   setCode={() => {}}
 *   setDiscount={() => {}}
 *   setExpireAt={() => {}}
 *   setProductIds={() => {}}
 * />
 */

export const Coupons = React.memo(
  ({ setCode, setDiscount, setExpireAt, setProductIds }: CouponProps) => {
    const { JWT } = useJWT();
    const { data: dataMe } = useMe();
    const [searchParams] = useSearchParams();

    const userId = dataMe?.data?._id;

    const sortStr = searchParams.get("sort")!;
    let sort: SortCreatedAt | SortDiscount;
    switch (sortStr) {
      case "oldest":
        sort = "+createdAt";
        break;

      case "discount-highest":
        sort = "-discount";
        break;

      case "discount-lowest":
        sort = "+discount";
        break;

      default:
        sort = "-createdAt";
        break;
    }

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
      queryKey: ["coupons-seller", userId, sort],
    });

    const renderFn = ({ data }: { data: { coupons: ICoupon[] } }) => {
      return data?.coupons?.map(
        ({ _id, code, expireAt, discount, products }: ICoupon) => (
          <Coupon
            key={_id}
            couponId={_id}
            affectedItems={products}
            code={code}
            validUntil={toDate(expireAt)}
            discount={discount}
            setCode={setCode}
            setDiscount={setDiscount}
            setExpireAt={setExpireAt}
            setProductIds={setProductIds}
          />
        )
      );
    };

    return <InfiniteProducts {...data} renderFn={renderFn} container={Grid} />;
  }
);
