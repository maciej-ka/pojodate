export interface Pojo {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  miliseconds: number;
}

export function add(
  base: Pojo,
  change: Partial<Pojo> | ((base: Pojo) => Partial<Pojo>)
): Pojo {
  const pojo = typeof change === "function" ? change(base) : change;
  return {
    years: base.years + (pojo.years || 0),
    months: base.months + (pojo.months || 0),
    days: base.days + (pojo.days || 0),
    hours: base.hours + (pojo.hours || 0),
    minutes: base.minutes + (pojo.minutes || 0),
    seconds: base.seconds + (pojo.seconds || 0),
    miliseconds: base.miliseconds + (pojo.miliseconds || 0),
  };
}

