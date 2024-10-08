import { describe, expect, it } from "vitest";

import { formatSignificant } from "../src/pojo";
import PojoDate from "../src/pojodate";

// Buniek
// Gniewo
// Zu
// Jaga

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
      miliseconds: 200,
    });
    expect(actual.getTime()).toEqual(
      new Date("2024-03-04 19:03:00:200").getTime()
    );
  });
});

describe("pojo", () => {
  it("works", () => {
    const actual = new PojoDate("2020-02-23 14:59:00:200").pojo;
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

describe("years, months ...", () => {
  it("works", () => {
    const actual = new PojoDate("2024-03-04 19:03:30.200") ;
    expect(actual.years).toEqual(2024);
    expect(actual.months).toEqual(3);
    expect(actual.days).toEqual(4);
    expect(actual.hours).toEqual(19);
    expect(actual.minutes).toEqual(3);
    expect(actual.seconds).toEqual(30);
    expect(actual.miliseconds).toEqual(200);
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
  });

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
  it("padded", () => {
    const date = new PojoDate("2017-09-02 15:20:05.030");
    const actual = date.format((d) => `${d.years},${d.months},${d.days},${d.hours},${d.minutes},${d.seconds},${d.miliseconds}`);
    expect(actual).toEqual("2017,09,02,15,20,05,030");
  });

  it("num", () => {
    const date = new PojoDate("2017-09-02 15:20:05.030");
    const actual = date.format(({num}) => `${num.years},${num.months},${num.days},${num.hours},${num.minutes},${num.seconds},${num.miliseconds}`);
    expect(actual).toEqual("2017,9,2,15,20,5,30");
  })

  it("long", () => {
    const date = new PojoDate("2017-09-02 15:20:00");
    const actual = date.format(({ long }) => `${long.month},${long.weekday}`);
    expect(actual).toEqual("September,Saturday")
  })

  it("short", () => {
    const date = new PojoDate("2020-02-23 14:59:00");
    const actual = date.format(({ short }) => `${short.month},${short.weekday}`);
    expect(actual).toEqual("Feb,Sun")
  })

  it("iso date", () => {
    const actual = new PojoDate("2016-01-14 08:39:00").format(({ iso }) => iso.date);
    expect(actual).toEqual("2016-01-14");
  })

  it("iso time", () => {
    const actual = new PojoDate("2024-03-04 19:03:00").format(({ iso }) => iso.time);
    expect(actual).toEqual("19:03:00");
  })

  it("iso full", () => {
    const actual = new PojoDate("2017-09-02 15:20:00").format(({ iso }) => iso.full);
    expect(actual).toEqual("2017-09-02 15:20:00");
  })
});

describe("formatIso", () => {
  it("works", () => {
    const actual = new PojoDate("2020-02-23 14:59:00").formatIso();
    expect(actual).toEqual("2020-02-23 14:59:00");
  });
});

describe("formatSignificant", () => {
  it("works", () => {
    const pojo = {
      years: 0,
      months: 0,
      days: 1,
      hours: 2,
      minutes: 20,
      seconds: 0,
      miliseconds: 0,
    };
    const actual = formatSignificant(pojo, 2, ({ parts }) => parts.join(", "));
    expect(actual).toEqual("1 day, 2 hours");
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

describe("website examples", () => {
  it("first day of next month", () => {
    const actual = new PojoDate("2020-02-23 14:59")
      .add({ months: 1 })
      .set({ days: 1 })
      .formatIso("date");
    expect(actual).toEqual("2020-03-01");
  });

  it("last day of month", () => {
    const actual = new PojoDate("2016-01-14 08:39:00")
      .add({ months: 1 })
      .set({ days: 1 })
      .add({ days: -1 })
      .formatIso("date");
    expect(actual).toEqual("2016-01-31");
  });

  it("last day of month using zero days", () => {
    const actual = new PojoDate("2016-01-14 08:39:00")
      .add({ months: 1 })
      .set({ days: 0 })
      .formatIso("date");
    expect(actual).toEqual("2016-01-31");
  });

  it("convert to date with toDate", () => {
    const actual = new PojoDate("2025-02-14").toDate();
    expect(actual).toEqual(new Date("2025-02-14"));
    expect(actual).not.toHaveProperty("pojo");
  });

  it("convert to date with new Date", () => {
    const pojodate = new PojoDate("2025-02-14");
    const actual = new Date(pojodate);
    expect(actual).toEqual(new Date("2025-02-14"));
    expect(actual).not.toHaveProperty("pojo");
  });
});
