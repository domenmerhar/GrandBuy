import { FC } from "react";
import { useTranslation } from "react-i18next";
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
  color: var(--gray-light-0);
`;

const ClockTextHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > *:last-child {
    margin-top: -1.2rem;
    color: var(--gray-light-2);
  }
`;

const ClockText = styled.span<ClockTextProps>`
  font-size: 4.8rem;
  font-weight: 600;
  color: ${({ $color }) =>
    $color === "orange" ? "var(--orange-4)" : "var(--gray-light-0)"};
`;

export const Clock: FC<ClockProps> = ({ days, hours, minutes, seconds }) => {
  const { t } = useTranslation();

  return (
    <StyledClock>
      <Span>{t("thePromotionEndsIn")}</Span>
      <Timer>
        <ClockTextHolder>
          <ClockText $color="white">{String(days).padStart(2, "0")}</ClockText>
          <Span>{t("days")}</Span>
        </ClockTextHolder>
        <ClockText $color="orange">:</ClockText>

        <ClockTextHolder>
          <ClockText $color="white">{String(hours).padStart(2, "0")}</ClockText>
          <Span>{t("hours")}</Span>
        </ClockTextHolder>
        <ClockText $color="orange">:</ClockText>

        <ClockTextHolder>
          <ClockText $color="white">
            {String(minutes).padStart(2, "0")}
          </ClockText>
          <Span>{t("minutes")}</Span>
        </ClockTextHolder>
        <ClockText $color="orange">:</ClockText>

        <ClockTextHolder>
          <ClockText $color="white">
            {String(seconds).padStart(2, "0")}
          </ClockText>
          <Span>{t("seconds")}</Span>
        </ClockTextHolder>
      </Timer>
    </StyledClock>
  );
};
