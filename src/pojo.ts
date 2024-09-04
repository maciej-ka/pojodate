export interface Pojo {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function add(
  current: Pojo,
  arg: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)
): Pojo {
  const pojo = typeof arg === "function" ? arg(current) : arg;
  return {
    years: current.years + (pojo.years || 0),
    months: current.months + (pojo.months || 0),
    days: current.days + (pojo.days || 0),
    hours: current.hours + (pojo.hours || 0),
    minutes: current.minutes + (pojo.minutes || 0),
    seconds: current.seconds + (pojo.seconds || 0),
  };
}

export function toMiliseconds(pojo: Pojo): number {
  let result = 0;
  let multiplier = 1;
  const calc = (value: number, multiplierBump: number) => [
    result + value * multiplier * multiplierBump,
    multiplier * multiplierBump,
  ];
  [result, multiplier] = calc(pojo.seconds, 1000);
  [result, multiplier] = calc(pojo.minutes, 60);
  [result, multiplier] = calc(pojo.hours, 60);
  [result, multiplier] = calc(pojo.days, 24);
  [result, multiplier] = calc(pojo.months, 30);
  [result, multiplier] = calc(pojo.years, 12);
  return result;
}
