import { Pojo } from "./pojo";
declare class PojoDate extends Date {
    constructor();
    constructor(string: string);
    constructor(date: Date);
    constructor(year: number, monthIndex: number, day?: number, hours?: number, minutes?: number, seconds?: number, miliseconds?: number);
    constructor(pojo: Pick<Pojo, "years"> & Partial<Pojo>);
    toPojo(): Pojo;
    toDate(): Date;
    add(pojo: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): PojoDate;
    set(pojo: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): PojoDate;
    format(formatter: (current: {
        [K in keyof Pojo]: string;
    }) => string): string;
    formatIso(parts?: "full" | "date" | "time"): string;
}
export default PojoDate;
