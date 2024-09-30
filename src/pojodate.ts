import { Pojo, add, format, formatIso, PojoFormatterArg, set } from './pojo';

type PojoDateFormatterArg = PojoFormatterArg & {
  long: { month: string; weekday: string };
  short: { month: string; weekday: string };
};

class PojoDate extends Date {
  // standard Date constructors
  constructor();
  constructor(string: string);
  constructor(date: Date);
  constructor(
    year: number,
    monthIndex: number,
    day?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    miliseconds?: number
  );
  // unique PojoDate constructor
  constructor(pojo: Pick<Pojo, "years"> & Partial<Pojo>);
  constructor(...args: any[]) {
    if (args[0]?.years) {
      super(
        args[0].years,
        args[0].months !== undefined ? args[0].months - 1 : 0,
        args[0].days ?? 1,
        args[0].hours ?? 0,
        args[0].minutes ?? 0,
        args[0].seconds ?? 0,
        args[0].miliseconds ?? 0
      );
    } else {
      super(...(args as [any]));
    }
  }

  get pojo(): Pojo {
    return {
      years: this.getFullYear(),
      months: this.getMonth() + 1,
      days: this.getDate(),
      hours: this.getHours(),
      minutes: this.getMinutes(),
      seconds: this.getSeconds(),
      miliseconds: this.getMilliseconds(),
    };
  }
  get years(): number { return this.getFullYear() }
  get months(): number { return this.getMonth() + 1 }
  get days(): number { return this.getDate() }
  get hours(): number { return this.getHours() }
  get minutes(): number { return this.getMinutes() }
  get seconds(): number { return this.getSeconds() }
  get miliseconds(): number { return this.getMilliseconds() }

  toDate(): Date {
    const pojo = this.pojo;
    return new Date(
      pojo.years,
      pojo.months - 1,
      pojo.days,
      pojo.hours,
      pojo.minutes,
      pojo.seconds,
      pojo.miliseconds
    );
  }

  add(pojo: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): PojoDate {
    return new PojoDate(add(this.pojo, pojo));
  }

  set(pojo: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): PojoDate {
    return new PojoDate(set(this.pojo, pojo));
  }

  format(formatter: (argument: PojoDateFormatterArg) => string): string {
    let stdArgs: PojoFormatterArg;
    format(this.pojo, (args) => { stdArgs = args; return "" })
    const date = this;
    const args: PojoDateFormatterArg = {
      ...stdArgs,
      long: {
        get month() { return date.toLocaleString('default', { month: 'long' }) },
        get weekday() { return date.toLocaleString('default', { weekday: 'long' }) },
      },
      short: {
        get month() { return date.toLocaleString('default', { month: 'short' }) },
        get weekday() { return date.toLocaleString('default', { weekday: 'short' }) },
      }
    }
    return formatter(args);
  }

  formatIso(part: "full" | "date" | "time" = "full"): string {
    return formatIso(this.pojo, part);
  }
}

export default PojoDate;
