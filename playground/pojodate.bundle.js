var pojodate = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/pojodate.ts
  var pojodate_exports = {};
  __export(pojodate_exports, {
    default: () => pojodate_default
  });

  // src/pojo.ts
  function add(pojo, change) {
    const changeObj = typeof change === "function" ? change(pojo) : change;
    return {
      years: pojo.years + (changeObj.years || 0),
      months: pojo.months + (changeObj.months || 0),
      days: pojo.days + (changeObj.days || 0),
      hours: pojo.hours + (changeObj.hours || 0),
      minutes: pojo.minutes + (changeObj.minutes || 0),
      seconds: pojo.seconds + (changeObj.seconds || 0),
      miliseconds: pojo.miliseconds + (changeObj.miliseconds || 0)
    };
  }
  function set(pojo, change) {
    const changeObj = typeof change === "function" ? change(pojo) : change;
    return {
      ...pojo,
      ...changeObj
    };
  }
  function format(pojo, formatter) {
    const pad = (arg) => arg.toString().padStart(2, "0");
    const padded = {
      years: pojo.years.toString(),
      months: pad(pojo.months),
      days: pad(pojo.days),
      hours: pad(pojo.hours),
      minutes: pad(pojo.minutes),
      seconds: pad(pojo.seconds),
      miliseconds: pojo.miliseconds.toString().padStart(3, "0")
    };
    const iso = {
      date: `${padded.years}-${padded.months}-${padded.days}`,
      time: `${padded.hours}:${padded.minutes}:${padded.seconds}`
    };
    return formatter({
      ...padded,
      iso: {
        ...iso,
        full: iso.date + " " + iso.time
      },
      num: pojo
    });
  }
  function formatIso(pojo, part = "full") {
    return format(pojo, ({ iso }) => iso[part]);
  }

  // src/pojodate.ts
  var PojoDate = class _PojoDate extends Date {
    constructor(...args) {
      if (args[0]?.years) {
        super(
          args[0].years,
          args[0].months !== void 0 ? args[0].months - 1 : 0,
          args[0].days ?? 1,
          args[0].hours ?? 0,
          args[0].minutes ?? 0,
          args[0].seconds ?? 0,
          args[0].miliseconds ?? 0
        );
      } else {
        super(...args);
      }
    }
    get pojo() {
      return {
        years: this.getFullYear(),
        months: this.getMonth() + 1,
        days: this.getDate(),
        hours: this.getHours(),
        minutes: this.getMinutes(),
        seconds: this.getSeconds(),
        miliseconds: this.getMilliseconds()
      };
    }
    get years() {
      return this.getFullYear();
    }
    get months() {
      return this.getMonth() + 1;
    }
    get days() {
      return this.getDate();
    }
    get hours() {
      return this.getHours();
    }
    get minutes() {
      return this.getMinutes();
    }
    get seconds() {
      return this.getSeconds();
    }
    get miliseconds() {
      return this.getMilliseconds();
    }
    toDate() {
      const pojo = this.pojo;
      return new Date(
        pojo.years,
        pojo.months - 1,
        pojo.days,
        pojo.hours,
        pojo.minutes,
        pojo.seconds,
        pojo.miliseconds
      );
    }
    add(pojo) {
      return new _PojoDate(add(this.pojo, pojo));
    }
    set(pojo) {
      return new _PojoDate(set(this.pojo, pojo));
    }
    format(formatter) {
      let stdArgs;
      format(this.pojo, (args2) => {
        stdArgs = args2;
        return "";
      });
      const date = this;
      const args = {
        ...stdArgs,
        long: {
          get month() {
            return date.toLocaleString("default", { month: "long" });
          },
          get weekday() {
            return date.toLocaleString("default", { weekday: "long" });
          }
        },
        short: {
          get month() {
            return date.toLocaleString("default", { month: "short" });
          },
          get weekday() {
            return date.toLocaleString("default", { weekday: "short" });
          }
        }
      };
      return formatter(args);
    }
    formatIso(part = "full") {
      return formatIso(this.pojo, part);
    }
  };
  var pojodate_default = PojoDate;
  return __toCommonJS(pojodate_exports);
})();
