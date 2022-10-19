/**
 * Converts seconds to a readable hours and minutes string
 *
 * @param seconds - The seconds to be converted into hours and minutes
 * @returns A string of the form [hours]h [minutes]m (only shows hours if hours > 0)
 */
const secondsToHoursMinutes = (seconds: number): string => {
  const hours = Math.trunc(seconds / 3600);
  const minutes = Math.trunc((seconds % 3600) / 60);
  return `${hours ? `${hours}h` : ""}${hours && minutes ? " " : ""}${
    minutes ? `${minutes}m` : ""
  }`;
};

export { secondsToHoursMinutes };
