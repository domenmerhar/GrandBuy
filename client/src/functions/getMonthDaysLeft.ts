export const getMonthDaysLeft: () => number = () => {
  const date = new Date();
  return (
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() -
    date.getDate()
  );
};
