# PojoDate
A JS Date library made for developer experience.

**Work your dates using chained calls**
```js
// first day of next month
new PojoDate().add({ months: 1 }).set({ days: 1 }).formatIso("date")
```
_Wrapper labyrynths are still a valid alternative, especially if you're a minotaur._

**Small and expressive API**
based on object { years, months, days ... }
_Called Pojo for Plain Old Javascript Object_
