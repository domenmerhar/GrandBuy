import { useSearchParams } from "react-router-dom";
import { Modal } from "../../Util/Modal";
import { useEffect, useRef } from "react";

export const useProductInfoModal = () => {
  const { isOpen } = Modal.useModalContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const shippingRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleRef?.current)
      titleRef.current.value = searchParams.get("title") || "";

    if (priceRef?.current)
      priceRef.current.value = searchParams.get("price") || "";

    if (shippingRef?.current)
      shippingRef.current.value = searchParams.get("shipping") || "";
  }, [searchParams, isOpen]);

  const saveToSearchParams = () =>
    setSearchParams((searchParams) => {
      if (titleRef?.current?.value)
        searchParams.set("title", titleRef.current.value);

      if (priceRef?.current?.value)
        searchParams.set("price", priceRef.current.value);

      if (shippingRef?.current?.value)
        searchParams.set("shipping", shippingRef.current.value);
      return searchParams;
    });

  return { titleRef, priceRef, shippingRef, saveToSearchParams };
};
