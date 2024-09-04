import { Pojo, add, toMiliseconds } from './pojo';

class PojoDiff implements Pojo {
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


  add(arg: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): PojoDiff {
    return new PojoDiff(toMiliseconds(add(this, arg)));
  }
}

export default PojoDiff
