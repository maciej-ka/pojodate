export type Pojo = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  miliseconds: number;
}

export function add(
  current: Pojo,
  change: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)
): Pojo {
  const pojo = typeof change === "function" ? change(current) : change;
  return {
    years: current.years + (pojo.years || 0),
    months: current.months + (pojo.months || 0),
    days: current.days + (pojo.days || 0),
    hours: current.hours + (pojo.hours || 0),
    minutes: current.minutes + (pojo.minutes || 0),
    seconds: current.seconds + (pojo.seconds || 0),
    miliseconds: current.miliseconds + (pojo.miliseconds || 0),
  };
}

export function set(
  current: Pojo,
  change: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)
): Pojo {
  const pojo = typeof change === "function" ? change(current) : change;
  return {
    ...current,
    ...pojo
  }
}
