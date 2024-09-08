import { Pojo, add } from "./pojo";

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
  [result, multiplier] = calc(pojo.months, 30.4375);
  [result, multiplier] = calc(pojo.years, 12);
  return result;
}

class PojoInterval implements Pojo {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  constructor(miliseconds: number) {
    const calc = (value: number, divisor: number) => [
      Math.floor(value / divisor),
      value % divisor,
    ];
    [this.seconds] = calc(Math.abs(miliseconds), 1000);
    [this.minutes, this.seconds] = calc(this.seconds, 60);
    [this.hours, this.minutes] = calc(this.minutes, 60);
    [this.days, this.hours] = calc(this.hours, 24);
    [this.years, this.days] = calc(this.days, 365.25);
    [this.months, this.days] = calc(this.days, 30.4375);
  }

  add(arg: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): PojoInterval {
    return new PojoInterval(toMiliseconds(add(this, arg)));
  }

  formatSignificant(
    count: number,
    fn: ({
      keys,
      values,
      units,
      parts,
    }: {
      keys: string[];
      values: number[];
      units: string[];
      parts: string[];
    }) => string = ({ parts }) => parts.join(', ')
  ): string {
    const allKeys = ["years", "months", "days", "hours", "minutes", "seconds"];
    const leftTrim = allKeys.slice(allKeys.findIndex((unit) => this[unit]));
    const keys = leftTrim.slice(0, count).filter((key) => this[key]);
    const values = keys.map((key) => this[key]);
    const units = keys.map((key) => (this[key] > 1 ? key : key.slice(0, -1)));
    const parts = units.map((unit, i) => `${values[i]} ${unit}`);
    return fn({ keys, values, units, parts });
  }
}

export default PojoInterval;
