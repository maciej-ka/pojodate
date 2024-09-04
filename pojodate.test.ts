import { describe, expect, it } from "vitest";
import PojoDate from "./pojodate";

// Brun
// Gniewo
// Zu
// Jaga

// 2016-01-14 08:39:00
// 2017-09-02 15:20:00
// 2020-02-23 14:59:00
// 2024-03-04 19:03:00

describe("get pojo", () => {
  it("on correct date", () => {
    const actual = new PojoDate("2020-02-23 14:59:00").pojo();
    expect(actual).toMatchObject({
      years: 2020,
      months: 2,
      days: 23,
      hours: 14,
      minutes: 59,
      seconds: 0,
    });
  });
});

describe("constructor", () => {
  it("with pojo", () => {
    const actual = new PojoDate({
      years: 2024,
      months: 3,
      days: 4,
      hours: 19,
      minutes: 3,
      seconds: 0,
    });
    expect(actual.getTime()).toEqual(new Date("2024-03-04 19:03:00").getTime());
  });
});

describe("toDate", () => {
  it("works", () => {
    const actual = new PojoDate("2016-01-14 08:39:00").toDate();
    expect(actual).toEqual(new Date("2016-01-14 08:39:00"));
    expect(actual).not.toHaveProperty("pojo");
  });
});

describe("add", () => {
  it("year", () => {
    const actual = new PojoDate("2016-01-14 08:39:00").add({ years: 1 });
    expect(actual).toEqual(new Date("2017-01-14 08:39:00"));
  });
});

describe("set", () => {
  it("day", () => {
    const actual = new PojoDate("2024-03-04 19:03:00").set({ days: 1 });
    expect(actual).toEqual(new Date("2024-03-01 19:03:00"));
  });
});

describe("format", () => {
  it("default", () => {
    const date = new PojoDate("2017-09-02 15:20:00");
    const actual = date.format((d) => `${d.days},${d.months},${d.years}`);
    expect(actual).toEqual("02,09,2017");
  });

  it("iso", () => {
    const actual = new PojoDate("2020-02-23 14:59:00").formatIso();
    expect(actual).toEqual("2020-02-23 14:59:00");
  });
});

describe("chains", () => {
  it("add, set and format", () => {
    const actual = new PojoDate("2016-01-14")
      .add({ months: 1 })
      .set({ days: 1 })
      .format((d) => `${d.years}, ${d.months}, ${d.days}`);
    expect(actual).toEqual("2016, 02, 01");
  });
});

describe("interval", () => {
  it("returns pojo", () => {
    const date = new PojoDate("2024-03-04 19:03:00")
    const actual = date.interval("2017-09-02 15:20:00");
    expect(actual).toMatchObject({ years: 6, months: 7, days: 5, hours: 4, minutes: 43, seconds: 0 });
  });

  // it("can be added", () => {
  //   const date1 = new PojoDate("2024-03-04 19:03:00")
  //   const interval1 = date1.interval("2017-09-02 15:20:00");
  //   const date2 = new PojoDate("2016-01-14 08:39:00")
  //   const interval2 = date2.interval("2020-02-23 14:59:00");
  //   expect(interval1.add(interval2)).toMatchObject({ years: 10, months: 8, days: 5, hours: 4, minutes: 43, seconds: 0 });
  // })
});
