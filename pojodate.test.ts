import { describe, expect, it } from "vitest";
import PojoDate from "./pojodate";

// 2016-01-14 08:39:00
// 2024-03-04 19:03:00
// 2017-09-02 15:20:00
// 2020-02-23 14:59:00

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

// describe('add', () => {
//   it('year', () => {
//     const actual = new PojoDate("2016-01-14 08:39:00").add({ years: 1 });
//     expect(actual).toEqual(new Date("2017-01-14 08:39:00"));
//   });
// });

// describe('chains', () => {
//   it('add, set and format', () => {
//     const actual = new PojoDate('2016-01-14')
//       .add({ months: 1 })
//       .set({ days: 1 })
//       .format(pojo => `${pojo.years}, ${pojo.months}, ${pojo.days}`);
//     expect(actual).toEqual('2016, 02, 01');
//   });
// });

// import { describe, expect, it } from "vitest";
//
// import pojotime from './pojotime';
// pojotime();
//
// describe('pojotime to build pojo', () => {
//   it('works', () => {
//     const actual = new Date('2023-08-20 12:20:30').pojo;
//     expect(actual.years).toEqual(2023);
//     expect(actual.months).toEqual(8);
//     expect(actual.days).toEqual(20);
//     expect(actual.hours).toEqual(12);
//     expect(actual.minutes).toEqual(20);
//     expect(actual.seconds).toEqual(30);
//   });
// });
//
// describe('pojotime update with diff function', () => {
//   it('next day', () => {
//     const actual = new Date('2023-08-20 12:20:30').pojo.update((pojo) => ({
//       days: pojo.days + 1,
//     }));
//     expect(actual).toEqual(new Date('2023-08-21 12:20:30'));
//   });
//
//   it('first day of month', () => {
//     const actual = new Date('2023-08-20 12:20:30').pojo.update({ days: 1 });
//     expect(actual).toEqual(new Date('2023-08-01 12:20:30'));
//   });
//
//   it('last day of month', () => {
//     const actual = new Date('2023-08-20 12:20:30').pojo.update((pojo) => ({
//       months: pojo.months + 1,
//       days: 0,
//     }));
//     expect(actual).toEqual(new Date('2023-08-31 12:20:30'));
//   });
//
//   it('last day of previous month', () => {
//     const actual = new Date('2023-08-20 12:20:30').pojo.update({
//       days: 0,
//     });
//     expect(actual).toEqual(new Date('2023-07-31 12:20:30'));
//   });
//
//   it('one day before last day of previous month', () => {
//     const actual = new Date('2023-08-20 12:20:30').pojo.update({ days: -1 });
//     expect(actual).toEqual(new Date('2023-07-30 12:20:30'));
//   });
//
//   it('20th day of this month', () => {
//     const actual = new Date('2023-08-20 12:20:30').pojo.update({ days: 20 });
//     expect(actual).toEqual(new Date('2023-08-20 12:20:30'));
//   });
// });
