import { Hero } from "../../Components/Hero";
import { SaleSection } from "./SaleSection";
import { SkewedContainer } from "./SkewedContainer";
import { LatestProducts } from "./LatestProducts.tsx";
import { ForYouSection } from "./ForYouSection.tsx";
import { MainPageInfiniteProducts } from "./MainPageInfiniteProducts.tsx";

/**
 * Komponenta za prikaz glavne strani.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja glavno stran.
 *
 * @example
 * // Uporaba komponente
 * <MainPage />
 */


export const MainPage = () => {
  return (
    <>
      <Hero />

      <SkewedContainer>
        <SaleSection />
        <ForYouSection />
        <LatestProducts />
        <MainPageInfiniteProducts />
      </SkewedContainer>
    </>
  );
};