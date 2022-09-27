/// Convert from seconds to hours and minutes
const secondsToHoursMinutes = (seconds: number): string => {
  const hours = Math.trunc(seconds / 3600);
  const minutes = Math.trunc((seconds % 3600) / 60);
  return hours ? `${hours}h` : "" + `${minutes}m`;
};

export { secondsToHoursMinutes };
