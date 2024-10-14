import { FC } from "react";
import styled from "styled-components";

interface ClockProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ClockTextProps {
  $color: "orange" | "white";
}

const StyledClock = styled.div``;

const Timer = styled.div`
  display: flex;
  gap: 1.2rem;

  & > *:nth-child(2n) {
    margin-top: -3px;
  }
`;

const Span = styled.span`
  font-size: 1.6rem;
  color: var(--gray-0);
`;

const ClockTextHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > *:last-child {
    margin-top: -1.2rem;
    color: var(--gray-2);
  }

  &:first-child > *:last-child {
    margin-left: 2px;
  }
`;

const ClockText = styled.span<ClockTextProps>`
  font-size: 4.8rem;
  font-weight: 600;
  color: ${({ $color }) =>
    $color === "orange" ? "var(--orange-4)" : "var(--gray-0)"};
`;

export const Clock: FC<ClockProps> = () => {
  return (
    <StyledClock>
      <Span>The promotion ends in: </Span>
      <Timer>
        <ClockTextHolder>
          <ClockText $color="white">05</ClockText>
          <Span>Days</Span>
        </ClockTextHolder>
        <ClockText $color="orange">:</ClockText>

        <ClockTextHolder>
          <ClockText $color="white">34</ClockText>
          <Span>Hours</Span>
        </ClockTextHolder>
        <ClockText $color="orange">:</ClockText>

        <ClockTextHolder>
          <ClockText $color="white">40</ClockText>
          <Span>Minutes</Span>
        </ClockTextHolder>
        <ClockText $color="orange">:</ClockText>

        <ClockTextHolder>
          <ClockText $color="white">30</ClockText>
          <Span>Seconds</Span>
        </ClockTextHolder>
      </Timer>
    </StyledClock>
  );
};
