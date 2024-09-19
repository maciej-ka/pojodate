import { Pojo, add, set } from './pojo';

class PojoDate extends Date {
  constructor();
  constructor(string: string);
  constructor(date: Date);
  constructor(year: number, monthIndex: number, day?: number, hours?: number, minutes?: number, seconds?: number, miliseconds?: number);
  constructor(pojo: Pick<Pojo, "years"> & Partial<Pojo>);
  constructor(...args: any[]) {
    if (args[0]?.years) {
      super(
        args[0].years,
        (args[0].months !== undefined) ? args[0].months - 1 : 0,
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

  toPojo(): Pojo {
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

  toDate(): Date {
    const pojo = this.toPojo();
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
    return new PojoDate(add(this.toPojo(), pojo));
  }

  set(pojo: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): PojoDate {
    return new PojoDate(set(this.toPojo(), pojo));
  }

  // format(fn: (current: { [K in keyof Pojo]: string }) => string): string {
  //   const _current = this.toPojo();
  //   const pad = (arg: number) => arg.toString().padStart(2, "0");
  //   return fn({
  //     years: _current.years.toString(),
  //     months: pad(_current.months),
  //     days: pad(_current.days),
  //     hours: pad(_current.hours),
  //     minutes: pad(_current.minutes),
  //     seconds: pad(_current.seconds),
  //   });
  // }
  //
  // formatIso(parts: "full" | "date" | "time" = "full"): string {
  //   if (parts === "full") return this.format((d) => `${d.years}-${d.months}-${d.days} ${d.hours}:${d.minutes}:${d.seconds}`);
  //   if (parts === "date") return this.format((d) => `${d.years}-${d.months}-${d.days}`);
  //   return this.format((d) => `${d.hours}:${d.minutes}:${d.seconds}`);
  // }
}

export default PojoDate;
