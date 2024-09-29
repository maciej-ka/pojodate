export type Pojo = {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    miliseconds: number;
};
export declare function add(pojo: Pojo, change: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): Pojo;
export declare function set(pojo: Pojo, change: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)): Pojo;
export declare function format(pojo: Pojo, formatter: (current: {
    [K in keyof Pojo]: string;
}) => string): string;
export declare function formatIso(pojo: Pojo, parts?: "full" | "date" | "time"): string;
export declare function formatSignificant(pojo: Pojo, count: number, formatter?: ({ keys, values, units, parts, }: {
    keys: string[];
    values: number[];
    units: string[];
    parts: string[];
}) => string): string;
