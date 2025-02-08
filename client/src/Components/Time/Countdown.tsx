import styled from "styled-components";
import { timeUntilMidnight } from "../functions/timeUntilMidnight";
import { Clock } from "./Clock";
import { useEffect, useState } from "react";
import { iTime } from "../Util/types";
import { getMonthDaysLeft } from "../functions/getMonthDaysLeft";

const StyledCountdown = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Countdown = () => {
  const [
    { hoursUntilMidnight, minutesUntilMidnight, secondsUntilMidnight },
    setTime,
  ] = useState<iTime>(timeUntilMidnight());

  const days = getMonthDaysLeft();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, [hoursUntilMidnight, minutesUntilMidnight, secondsUntilMidnight]);

  return (
    <StyledCountdown>
      <Clock
        days={days}
        hours={hoursUntilMidnight}
        minutes={minutesUntilMidnight}
        seconds={secondsUntilMidnight}
      />
    </StyledCountdown>
  );
};
