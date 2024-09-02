type Pojo = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

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

  add(arg: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): PojoDate {
    const _current = this.pojo();
    const pojo = typeof arg === "function" ? arg(_current) : arg;
    return new PojoDate({
      years: _current.years + (pojo.years || 0),
      months: _current.months + (pojo.months || 0),
      days: _current.days + (pojo.days || 0),
      hours: _current.hours + (pojo.hours || 0),
      minutes: _current.minutes + (pojo.minutes || 0),
      seconds: _current.seconds + (pojo.seconds || 0),
    });
  }

  set(arg: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): PojoDate {
    const _current = this.pojo();
    const pojo = typeof arg === "function" ? arg(_current) : arg;
    return new PojoDate({ ..._current, ...pojo });
  }

  format(fn: (current: {[K in keyof Pojo]: string}) => string) {
    const _current = this.pojo();
    const pad = (arg: number) => arg.toString().padStart(2, '0');
    return fn({
      years: _current.years.toString(),
      months: pad(_current.months),
      days: pad(_current.days),
      hours: pad(_current.hours),
      minutes: pad(_current.minutes),
      seconds: pad(_current.seconds)
    });
  }
}

export default PojoDate;
