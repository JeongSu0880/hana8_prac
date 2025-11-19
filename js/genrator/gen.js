function* gener() {
    const x = yield "X는?";
    const y = yield x + 2;
    yield x + y;
    console.log("🚀 ~ gener ~ x + y:", x + y)
}

const iter = gener();
console.log("🚀 ~ iter:", iter)
const it1 = iter.next();
console.log("🚀 ~ it1:", it1)
const it2 = iter.next(4);
console.log("🚀 ~ it2:", it2)
const it3 = iter.next(6);
console.log("🚀 ~ it3:", it3)

if (it3.done) console.log("끝났음")

