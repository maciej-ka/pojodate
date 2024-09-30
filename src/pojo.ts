export type Pojo = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  miliseconds: number;
};

export function add(
  pojo: Pojo,
  change: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)
): Pojo {
  const changeObj = typeof change === "function" ? change(pojo) : change;
  return {
    years: pojo.years + (changeObj.years || 0),
    months: pojo.months + (changeObj.months || 0),
    days: pojo.days + (changeObj.days || 0),
    hours: pojo.hours + (changeObj.hours || 0),
    minutes: pojo.minutes + (changeObj.minutes || 0),
    seconds: pojo.seconds + (changeObj.seconds || 0),
    miliseconds: pojo.miliseconds + (changeObj.miliseconds || 0),
  };
}

export function set(
  pojo: Pojo,
  change: Partial<Pojo> | ((current: Pojo) => Partial<Pojo>)
): Pojo {
  const changeObj = typeof change === "function" ? change(pojo) : change;
  return {
    ...pojo,
    ...changeObj,
  };
}

export type PojoFormatterArg = { [K in keyof Pojo]: string } & { num: Pojo }
export function format(
  pojo: Pojo,
  formatter: (argument: PojoFormatterArg) => string
): string {
  const pad = (arg: number) => arg.toString().padStart(2, "0");
  const padded = {
    years: pojo.years.toString(),
    months: pad(pojo.months),
    days: pad(pojo.days),
    hours: pad(pojo.hours),
    minutes: pad(pojo.minutes),
    seconds: pad(pojo.seconds),
    miliseconds: pojo.miliseconds.toString().padStart(3, "0"),
  }
  return formatter({
    ...padded,
    num: pojo
  });
}

// prettier-ignore
export function formatIso(
  pojo: Pojo,
  parts: "full" | "date" | "time" = "full"
): string {
  if (parts === "full") return format(pojo, (d) => `${d.years}-${d.months}-${d.days} ${d.hours}:${d.minutes}:${d.seconds}`);
  if (parts === "date") return format(pojo, (d) => `${d.years}-${d.months}-${d.days}`);
  return format(pojo, (d) => `${d.hours}:${d.minutes}:${d.seconds}`);
}

export function formatSignificant(
  pojo: Pojo,
  count: number,
  formatter: ({
    keys,
    values,
    units,
    parts,
  }: {
    keys: string[];
    values: number[];
    units: string[];
    parts: string[];
  }) => string = ({ parts }) => parts.join(", ")
): string {
  const allKeys = [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
    "seconds",
    "miliseconds",
  ];
  const leftTrim = allKeys.slice(allKeys.findIndex((unit) => pojo[unit]));
  const keys = leftTrim.slice(0, count).filter((key) => pojo[key]);
  const values = keys.map((key) => pojo[key]);
  const units = keys.map((key) => (pojo[key] > 1 ? key : key.slice(0, -1)));
  const parts = units.map((unit, i) => `${values[i]} ${unit}`);
  return formatter({ keys, values, units, parts });
}
