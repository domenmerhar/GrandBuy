import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop komponenta za samodejno premikanje na vrh strani ob spremembi poti.
 *
 * @function
 * @returns {null} - Komponenta ne prikazuje ničesar.
 *
 * @example
 * // Uporaba komponente
 * <ScrollToTop />
 */

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
