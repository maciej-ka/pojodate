# PojoDate
A JS Date library made for developer experience.

**Work your dates using chained calls**
```
// first day of next month
new PojoDate().add({ months: 1 }).set({ days: 1 }).formatIso("date")
// "2020-03-01"
```
_Wrapper labyrynths are still a valid alternative, especially for minotaurs._
--> How about last day of month?
`new PojoDate().add({ months: 1 }).set({ days: 1 }).add({ days: -1 })`
or shorter:
`new PojoDate().add({ months: 1 }).set({ days: 0 })`

**Small and expressive API**
based on object { years, months, days ... }
_Called Pojo for Plain Old Java Object._

**PojoDate extends Date**
_90% conversion drop here_
What will happen if in 2088 base Date will add same methods?
Your code will work as before, still using PojoDate versions.
Outside, to be safe, please convert to Date when calling libs.
```
const schedule = require('node-schedule');
const valentine = new PojoDate('2025-02-14');
schedule.scheduleJob(new Date(valentine), () => shave());
```
or
`schedule.scheduleJob(valentine.toDate(), () => shave());`

**Intervals**
_We also offer Ponzi Scheme benefits to early adopters_

