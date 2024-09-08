# PojoDate
A JS Date library made for developer experience.

**Work your dates using chained calls**
```
// first day of next month
new PojoDate().add({ months: 1 }).set({ days: 1 }).formatIso("date")
// "2020-03-01"
```
_Wrapper labyrynths are still a valid alternative, especially for minotaurs._
--> Last day of month
`new PojoDate().add({ months: 1 }).set({ days: 1 }).add({ days: -1 })`
or shorter:
`new PojoDate().add({ months: 1 }).set({ days: 0 })`

**Small and expressive API**
based on object { years, months, days ... }
_Called Pojo for Plain Old Java Object._

**PojoDate extends Date**
_90% conversion drop here_
What will happen when base Date will receive some of these methods?
Your code will work as before, still using PojoDate versions.
Outside, to be safe, please convert to Date when calling libs.
```
const schedule = require('node-schedule');
const valentine = new PojoDate('2025-02-14');
schedule.scheduleJob(new Date(valentine), shave);
```
or
`schedule.scheduleJob(valentine.toDate(), shave);`

**Intervals**
```
new PojoDate("2024-09-06 12:00:00").intervalTo("2024-09-06 16:20:40").formatSignificant(2);
// "4 hours, 20 minutes"
```
Intervals also have format of { years, months, days ... }.
So they can be used in PojoDate methods as an argument:
```
// TODO
```
And interval itself has an add method:
```
const interval1 = new PojoDate("2024-09-06 12:00:00").intervalTo("2024-09-06 16:20:40")
const interval2 = new PojoDate("2024-09-06 17:00:00").intervalTo("2024-09-06 19:00:00")
const total = interval1.add(interval2)
// 
```


**Early version**
Please report bugs and feature requests here: https://github.com/maciej-ka/pojotime/issues
_We offer Ponzi Scheme benefits to early adopters_

