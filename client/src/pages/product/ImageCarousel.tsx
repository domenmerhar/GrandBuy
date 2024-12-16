import styled from "styled-components";
import { ArrowButton } from "../../Util/ArrowButton";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useState } from "react";

const StyledImageCarousel = styled.div`
  overflow: hidden;
  position: relative;

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

  & img {
    height: auto;
    object-fit: cover;
    flex-shrink: 0;
    flex-grow: 0;
  }
`;

export const ImageCarousel = () => {
  const maxImages = 4;
  const [currImageNumber, setCurrImageNumber] = useState<number>(0);

  const handleClick = (direction: "left" | "right") => () =>
    setCurrImageNumber((prev) => {
      if (direction === "left") return prev === 0 ? maxImages - 1 : prev - 1;
      return prev === maxImages - 1 ? 0 : prev + 1;
    });

  return (
    <StyledImageCarousel>
      <ImageSlider $currImageNumber={currImageNumber}>
        <img src="/src/public/shopping-bag.jpg" />
        <img src="/src/public/shopping-bag.jpg" />
        <img src="/src/public/shopping-bag.jpg" />
        <img src="/src/public/shopping-bag.jpg" />
      </ImageSlider>

      <ArrowButton $size="large" onClick={handleClick("left")}>
        <HiChevronLeft />
      </ArrowButton>

      <ArrowButton $size="large" onClick={handleClick("right")}>
        <HiChevronRight />
      </ArrowButton>
    </StyledImageCarousel>
  );
};
