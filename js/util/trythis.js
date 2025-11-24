// 1970년 1월 1일과 1970년 1월 2일의 차이를 초로 나타내시오.

const { match } = require("assert");
const { arrayBuffer } = require("stream/consumers");

const d1 = new Date(1970, 1, 1).valueOf();
console.log("🚀 ~ d1:", d1)
const d2 = new Date(1970, 1, 2).valueOf();

console.log("🚀 차이는? :", d2 - d1)
// console.log(new Date(2646000000))


// 이 달의 날짜 5개를 무작위로 만들어 역순으로 출력하시오.

const d3 = new Date();
d3.setMonth(d3, getMonth() + 1)
d3.setDate(0)
const lastday = d3.getDate();
const rand = (s, e) => s + Math.floor((e - s + 1) * Math.random())

const dates = [];
do {

} while (dates.length < 5)
//     내년(2026년) 오늘의 요일을 출력하시오.

const nextToday = new Date(Date.prototype.getFullYear + 1, Date.prototype.getMonth, Date.prototype[[ResizeObserverSizeotype.getDay())
console.log("🚀 ~ nextToday:", nextToday)



// 오늘로 부터 100일 후의 날짜는 ?


