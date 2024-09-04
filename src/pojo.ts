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

