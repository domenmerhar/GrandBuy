import styled from "styled-components";
import { ArrowButton } from "../../Util/ArrowButton";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { FC, useState } from "react";

const StyledImageCarousel = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;

  & > button:nth-of-type(1) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }

  & > button:nth-of-type(2) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
  }
`;

const ImageSlider = styled.div<{ $currImageNumber: number }>`
  display: flex;
  align-items: center;

  transition: transform 200ms ease-in-out;
  transform: translateX(-${({ $currImageNumber }) => $currImageNumber * 100}%);
  width: 100%;

  & > * {
    height: auto;
    object-fit: cover;
    flex-shrink: 0;
    flex-grow: 0;
    width: 100%;
  }
`;

interface ImageCarouselProps {
  images: string[];
}

/**
 * Komponenta za prikaz slik v karuselu.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string[]} props.images - Seznam URL-jev slik za prikaz.
 * @returns {JSX.Element} JSX element, ki predstavlja karusel slik.
 *
 * @example
 * // Uporaba komponente
 * <ImageCarousel images={["https://example.com/image1.jpg", "https://example.com/image2.jpg"]} />
 */

export const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
  const maxImages = images.length || 1;
  const [currImageNumber, setCurrImageNumber] = useState<number>(0);

  const handleClick = (direction: "left" | "right") => () =>
    setCurrImageNumber((prev) => {
      if (direction === "left") return prev === 0 ? maxImages - 1 : prev - 1;
      return prev === maxImages - 1 ? 0 : prev + 1;
    });

  return (
    <StyledImageCarousel>
      <ImageSlider $currImageNumber={currImageNumber}>
        {images.length ? (
          images.map((image, index) => <img key={index} src={image} />)
        ) : (
          <HiOutlinePhotograph />
        )}
      </ImageSlider>

      <ArrowButton
        $size="large"
        onClick={handleClick("left")}
        disabled={!images.length}
      >
        <HiChevronLeft />
      </ArrowButton>

      <ArrowButton
        $size="large"
        onClick={handleClick("right")}
        disabled={!images.length}
      >
        <HiChevronRight />
      </ArrowButton>
    </StyledImageCarousel>
  );
};
