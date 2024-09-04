import { add, Pojo } from "./pojodate";

class PojoDiff implements Pojo {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  constructor(pojo: Pojo) {
    this.years = pojo.years;
    this.months = pojo.months;
    this.days = pojo.days;
    this.hours = pojo.hours;
    this.minutes = pojo.minutes;
    this.seconds = pojo.seconds;
  }

  add(arg: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): PojoDiff {
    return new PojoDiff(add(this, arg));
  }
}

export default PojoDiff
