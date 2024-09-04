import PojoDiff from "./pojodiff";

export interface Pojo {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function add(current: Pojo, arg: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): Pojo {
  const pojo = typeof arg === "function" ? arg(current) : arg;
  return {
    years: current.years + (pojo.years || 0),
    months: current.months + (pojo.months || 0),
    days: current.days + (pojo.days || 0),
    hours: current.hours + (pojo.hours || 0),
    minutes: current.minutes + (pojo.minutes || 0),
    seconds: current.seconds + (pojo.seconds || 0),
  }
}

class PojoDate extends Date {
  pojo(): Pojo {
    return {
      years: this.getFullYear(),
      months: this.getMonth() + 1,
      days: this.getDate(),
      hours: this.getHours(),
      minutes: this.getMinutes(),
      seconds: this.getSeconds(),
    };
  }

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
  constructor(pojo: Pick<Pojo, "years"> & Partial<Pojo>);
  constructor(...args: any[]) {
    if (args[0]?.years) {
      super(
        args[0].years,
        args[0].months ? args[0].months - 1 : 0,
        args[0].days || 1,
        args[0].hours || 0,
        args[0].minutes || 0,
        args[0].seconds || 0
      );
    } else {
      super(...(args as [any]));
    }
  }

  toDate(): Date {
    const pojo = this.pojo();
    return new Date(
      pojo.years,
      pojo.months - 1,
      pojo.days,
      pojo.hours,
      pojo.minutes,
      pojo.seconds
    );
  }

  add(arg: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): PojoDate {
    return new PojoDate(add(this.pojo(), arg));
  }

  set(arg: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): PojoDate {
    const _current = this.pojo();
    const pojo = typeof arg === "function" ? arg(_current) : arg;
    return new PojoDate({ ..._current, ...pojo });
  }

  format(fn: (current: { [K in keyof Pojo]: string }) => string): string {
    const _current = this.pojo();
    const pad = (arg: number) => arg.toString().padStart(2, "0");
    return fn({
      years: _current.years.toString(),
      months: pad(_current.months),
      days: pad(_current.days),
      hours: pad(_current.hours),
      minutes: pad(_current.minutes),
      seconds: pad(_current.seconds),
    });
  }

  formatIso(parts: "full" | "date" | "time" = "full"): string {
    if (parts === "full") return this.format((d) => `${d.years}-${d.months}-${d.days} ${d.hours}:${d.minutes}:${d.seconds}`);
    if (parts === "date") return this.format((d) => `${d.years}-${d.months}-${d.days}`);
    return this.format((d) => `${d.hours}:${d.minutes}:${d.seconds}`);
  }

  interval(): PojoDiff;
  interval(string: string): PojoDiff;
  interval(date: Date): PojoDiff;
  interval(
    year: number,
    monthIndex: number,
    day?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    miliseconds?: number
  ): PojoDiff;
  interval(pojo: Pick<Pojo, "years"> & Partial<Pojo>): PojoDiff;
  interval(...args: any[]): PojoDiff {
    const diff = this.getTime() - new PojoDate(...(args as [any])).getTime();
    let years: number;
    let months: number;
    let days: number;
    let hours: number;
    let minutes: number;
    let seconds: number;
    const calc = (value: number, divisor: number) => [
      Math.floor(value / divisor),
      value % divisor,
    ];
    [seconds] = calc(Math.abs(diff), 1000);
    [minutes, seconds] = calc(seconds, 60);
    [hours, minutes] = calc(minutes, 60);
    [days, hours] = calc(hours, 24);
    [months, days] = calc(days, 30);
    [years, months] = calc(months, 12);
    return new PojoDiff({ years, months, days, hours, minutes, seconds });
  }
}

export default PojoDate;
