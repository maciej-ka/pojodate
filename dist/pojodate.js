"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pojo_1 = require("./pojo");
class PojoDate extends Date {
    constructor(...args) {
        var _a, _b, _c, _d, _e, _f;
        if ((_a = args[0]) === null || _a === void 0 ? void 0 : _a.years) {
            super(args[0].years, args[0].months !== undefined ? args[0].months - 1 : 0, (_b = args[0].days) !== null && _b !== void 0 ? _b : 1, (_c = args[0].hours) !== null && _c !== void 0 ? _c : 0, (_d = args[0].minutes) !== null && _d !== void 0 ? _d : 0, (_e = args[0].seconds) !== null && _e !== void 0 ? _e : 0, (_f = args[0].miliseconds) !== null && _f !== void 0 ? _f : 0);
        }
        else {
            super(...args);
        }
    }
    toPojo() {
        return {
            years: this.getFullYear(),
            months: this.getMonth() + 1,
            days: this.getDate(),
            hours: this.getHours(),
            minutes: this.getMinutes(),
            seconds: this.getSeconds(),
            miliseconds: this.getMilliseconds(),
        };
    }
    toDate() {
        const pojo = this.toPojo();
        return new Date(pojo.years, pojo.months - 1, pojo.days, pojo.hours, pojo.minutes, pojo.seconds, pojo.miliseconds);
    }
    add(pojo) {
        return new PojoDate((0, pojo_1.add)(this.toPojo(), pojo));
    }
    set(pojo) {
        return new PojoDate((0, pojo_1.set)(this.toPojo(), pojo));
    }
    format(formatter) {
        return (0, pojo_1.format)(this.toPojo(), formatter);
    }
    formatIso(parts = "full") {
        return (0, pojo_1.formatIso)(this.toPojo(), parts);
    }
}
exports.default = PojoDate;
