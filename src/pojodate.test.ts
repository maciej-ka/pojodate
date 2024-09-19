import { describe, expect, it } from "vitest";

import { formatSignificant } from './pojo';
import PojoDate from './pojodate';

// Jaga
// Buniek
// Gniewo
// Zu

// 2016-01-14 08:39:00
// 2017-09-02 15:20:00
// 2020-02-23 14:59:00
// 2024-03-04 19:03:00

describe("constructor", () => {
  it("with pojo", () => {
    const actual = new PojoDate({
      years: 2024,
      months: 3,
      days: 4,
      hours: 19,
      minutes: 3,
      seconds: 0,
      miliseconds: 200
    });
    expect(actual.getTime()).toEqual(new Date("2024-03-04 19:03:00:200").getTime());
  });
});

describe("get pojo", () => {
  it("on correct date", () => {
    const actual = new PojoDate("2020-02-23 14:59:00:200").toPojo();
    expect(actual).toEqual({
      years: 2020,
      months: 2,
      days: 23,
      hours: 14,
      minutes: 59,
      seconds: 0,
      miliseconds: 200,
    });
  });
});

describe("toDate", () => {
  it("works", () => {
    const actual = new PojoDate("2016-01-14 08:39:00.200").toDate();
    expect(actual).toEqual(new Date("2016-01-14 08:39:00.200"));
    expect(actual).not.toHaveProperty("pojo");
  });
});

describe("add", () => {
  it("year", () => {
    const actual = new PojoDate("2016-01-14 08:39:00").add({ years: 1 });
    expect(actual).toEqual(new Date("2017-01-14 08:39:00"));
  });

  it("month", () => {
    const actual = new PojoDate("2016-01-14 08:39:00").add({ months: 1 });
    expect(actual).toEqual(new Date("2016-02-14 08:39:00"));
  })

  it("day back", () => {
    const actual = new PojoDate("2024-03-04 19:03:00").add({ days: -1 });
    expect(actual).toEqual(new Date("2024-03-03 19:03:00"));
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

  it("formatSignificant", () => {
    const pojo = { years: 0, months: 0, days: 1, hours: 2, minutes: 20, seconds: 0, miliseconds: 0 }
    const actual = formatSignificant(pojo, 2, ({ parts }) => parts.join(', '));
    expect(actual).toEqual("1 day, 2 hours")
  })
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

describe("website examples", () => {
  it("first day of next month", () => {
    const actual = new PojoDate("2020-02-23 14:59").add({ months: 1 }).set({ days: 1 }).formatIso("date")
    expect(actual).toEqual("2020-03-01");
  });

  it("last day of month", () => {
    const actual = new PojoDate("2016-01-14 08:39:00").add({ months: 1 }).set({ days: 1 }).add({ days: -1 }).formatIso("date")
    expect(actual).toEqual("2016-01-31");
  });

  it("last day of month using zero days", () => {
    const actual = new PojoDate("2016-01-14 08:39:00").add({ months: 1 }).set({ days: 0 }).formatIso("date")
    expect(actual).toEqual("2016-01-31");
  });

  it("convert to date with toDate", () => {
    const actual = new PojoDate('2025-02-14').toDate();
    expect(actual).toEqual(new Date('2025-02-14'));
    expect(actual).not.toHaveProperty("pojo");
  })

  it("convert to date with new Date", () => {
    const pojodate = new PojoDate('2025-02-14')
    const actual = new Date(pojodate);
    expect(actual).toEqual(new Date('2025-02-14'));
    expect(actual).not.toHaveProperty("pojo");
  })
});
