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

export function format(pojo: Pojo, fn: (current: { [K in keyof Pojo]: string }) => string): string {
  const pad = (arg: number) => arg.toString().padStart(2, "0");
  return fn({
    years: pojo.years.toString(),
    months: pad(pojo.months),
    days: pad(pojo.days),
    hours: pad(pojo.hours),
    minutes: pad(pojo.minutes),
    seconds: pad(pojo.seconds),
    miliseconds: pojo.miliseconds.toString(),
  });
}

export function formatIso(pojo: Pojo, parts: "full" | "date" | "time" = "full"): string {
  if (parts === "full") return format(pojo, (d) => `${d.years}-${d.months}-${d.days} ${d.hours}:${d.minutes}:${d.seconds}`);
  if (parts === "date") return format(pojo, (d) => `${d.years}-${d.months}-${d.days}`);
  return format(pojo, (d) => `${d.hours}:${d.minutes}:${d.seconds}`);
}
