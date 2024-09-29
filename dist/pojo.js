"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = add;
exports.set = set;
exports.format = format;
exports.formatIso = formatIso;
exports.formatSignificant = formatSignificant;
function add(pojo, change) {
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
function set(pojo, change) {
    const changeObj = typeof change === "function" ? change(pojo) : change;
    return Object.assign(Object.assign({}, pojo), changeObj);
}
function format(pojo, formatter) {
    const pad = (arg) => arg.toString().padStart(2, "0");
    return formatter({
        years: pojo.years.toString(),
        months: pad(pojo.months),
        days: pad(pojo.days),
        hours: pad(pojo.hours),
        minutes: pad(pojo.minutes),
        seconds: pad(pojo.seconds),
        miliseconds: pojo.miliseconds.toString(),
    });
}
// prettier-ignore
function formatIso(pojo, parts = "full") {
    if (parts === "full")
        return format(pojo, (d) => `${d.years}-${d.months}-${d.days} ${d.hours}:${d.minutes}:${d.seconds}`);
    if (parts === "date")
        return format(pojo, (d) => `${d.years}-${d.months}-${d.days}`);
    return format(pojo, (d) => `${d.hours}:${d.minutes}:${d.seconds}`);
}
function formatSignificant(pojo, count, formatter = ({ parts }) => parts.join(", ")) {
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
