import { Pojo, add, toMiliseconds } from "./pojo";

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
    [this.months, this.days] = calc(this.days, 30);
    [this.years, this.months] = calc(this.months, 12);
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
