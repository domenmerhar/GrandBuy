import styled from "styled-components";
import { timeUntilMidnight } from "../functions/timeUntilMidnight";
import { Clock } from "./Clock";

const StyledCountdown = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Countdown = () => {
  const { hoursUntilMidnight, minutesUntilMidnight, secondsUntilMidnight } =
    timeUntilMidnight();

  return (
    <StyledCountdown>
      <Clock
        days={5}
        hours={hoursUntilMidnight}
        minutes={minutesUntilMidnight}
        seconds={secondsUntilMidnight}
      />
    </StyledCountdown>
  );
};
