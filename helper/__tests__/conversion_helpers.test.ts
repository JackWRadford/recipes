import { secondsToHoursMinutes } from "../conversion_helpers";

describe("SecondsToHoursMinutes", () => {
  test("test 5m (300 seconds)", () => {
    expect(secondsToHoursMinutes(300)).toBe("5m");
  });
  test("test 1h (3600 seconds)", () => {
    expect(secondsToHoursMinutes(3600)).toBe("1h");
  });
  test("test 2h25m (8700 seconds)", () => {
    7200;
    expect(secondsToHoursMinutes(8700)).toBe("2h 25m");
  });
});
