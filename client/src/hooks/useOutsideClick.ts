import { useEffect, useRef } from "react";

/**
 * useOutsideClick hook za zaznavanje klika izven določenega elementa.
 *
 * @param {function} handler - Funkcija, ki se izvede ob kliku izven elementa.
 * @param {boolean} [listenCapturing=true] - Ali naj se posluša dogodek v capturing fazi.
 * @returns {React.RefObject<HTMLElement>} - Ref objekt, ki ga je treba dodeliti elementu, za katerega želimo zaznati klik izven.
 *
 * @example
 * // Uporaba hook-a
 * const modalRef = useOutsideClick(() => setModalOpen(false));
 * return (
 * <div ref={modalRef}>
 * // Modal vsebina
 * </div>
 * );
 */

export const useOutsideClick = (
  handler: () => void,
  listenCapturing: boolean = true
) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
};
