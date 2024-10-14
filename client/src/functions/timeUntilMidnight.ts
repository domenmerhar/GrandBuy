export const timeUntilMidnight = () => {
  const midnight = new Date();
  midnight.setHours(24);
  midnight.setMinutes(0);
  midnight.setSeconds(0);
  midnight.setMilliseconds(0);

  const sUntilMidnight = (midnight.getTime() - new Date().getTime()) / 1000;

  const hoursUntilMidnight = Math.floor(sUntilMidnight / 3600);
  const minutesUntilMidnight = Math.floor(sUntilMidnight / 60) % 60;
  const secondsUntilMidnight = Math.floor(sUntilMidnight) % 60;

  return { hoursUntilMidnight, minutesUntilMidnight, secondsUntilMidnight };
};
