export const today = () => {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export const nDaysAgo = n => {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date;
};

export const weekAgo = () => nDaysAgo(7);

export const monthAgo = () => nDaysAgo(30);
