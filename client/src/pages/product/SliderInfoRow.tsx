import { Row } from "../../Util/Row";
import { ImageCarousel } from "./ImageCarousel";
import styled from "styled-components";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { ProductInfo } from "../../Components/ProductInfo";
import { FC } from "react";

const StyledSliderInfoRow = styled(Row)`
  @media (max-width: 49em) {
    flex-direction: column;
    gap: 3.2rem;
  }
`;

const ProductInfoHolder = styled(StyledSidebar)`
  align-self: flex-start;

  @media (max-width: 49em) {
    align-self: center;
  }
`;

const NoImage = styled.div`
  width: 100%;
  height: 100%;
`;

interface SliderInfoRowProps {
  images: string[];
  title: string;
  price: string;
  shipping: string;
  averageRating: string;
  unitsSold: string;
  createdBy: string;
  uploaded: string;
  discount: number;
}

/**
 * Komponenta za prikaz informacij o izdelku v kombinaciji z drsnikom slik.
 *
 * @component
 * @param {Object} props - Lastnosti komponente.
 * @param {string[]} props.images - Seznam URL-jev slik za prikaz.
 * @param {string} props.title - Naslov izdelka.
 * @param {string} props.price - Cena izdelka.
 * @param {string} props.shipping - Stroški pošiljanja izdelka.
 * @param {string} props.averageRating - Povprečna ocena izdelka.
 * @param {string} props.unitsSold - Število prodanih enot izdelka.
 * @param {string} props.createdBy - Avtor ali ustvarjalec izdelka.
 * @param {string} props.uploaded - Datum nalaganja izdelka.
 * @param {number} props.discount - Popust na izdelek.
 * @returns {JSX.Element} JSX element, ki predstavlja informacije o izdelku v kombinaciji z drsnikom slik.
 *
 * @example
 * // Uporaba komponente
 * <SliderInfoRow
 *   images={["https://example.com/image1.jpg", "https://example.com/image2.jpg"]}
 *   title="Odličen izdelek"
 *   price="$100"
 *   shipping="$10"
 *   averageRating="4.5"
 *   unitsSold="200"
 *   createdBy="JaneDoe"
 *   uploaded="2025-03-01"
 *   discount={10}
 * />
 */

export const SliderInfoRow: FC<SliderInfoRowProps> = ({
  images,
  title,
  price,
  shipping,
  averageRating,
  unitsSold,
  createdBy,
  uploaded,
  discount,
}) => {
  return (
    <StyledSliderInfoRow $gap="2.8rem" $alignItems="center">
      {images?.length > 0 ? (
        <ImageCarousel images={images} />
      ) : (
        <NoImage></NoImage>
      )}
      <ProductInfoHolder $position="sticky" $height="auto" $rounded>
        <ProductInfo
          title={title}
          price={price}
          shipping={shipping}
          averageRating={averageRating}
          unitsSold={unitsSold}
          createdBy={createdBy}
          uploaded={uploaded}
          discount={discount}
        />
      </ProductInfoHolder>
    </StyledSliderInfoRow>
  );
};
