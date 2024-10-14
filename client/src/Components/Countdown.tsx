import styled from "styled-components";
import { timeUntilMidnight } from "../functions/timeUntilMidnight";
import { Clock } from "./Clock";
import { useEffect, useState } from "react";

const StyledCountdown = styled.div`
  display: flex;
  flex-direction: column;
`;

interface iTime {
  hoursUntilMidnight: number;
  minutesUntilMidnight: number;
  secondsUntilMidnight: number;
}

export const Countdown = () => {
  const [
    { hoursUntilMidnight, minutesUntilMidnight, secondsUntilMidnight },
    setTime,
  ] = useState<iTime>(timeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, [hoursUntilMidnight, minutesUntilMidnight, secondsUntilMidnight]);

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
