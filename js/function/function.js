const gateCounter = (function counter() {
    let cnt = 0;
    return function () {
        return ++cnt;
    }
})(); //IIFE 즉시 실행
//q. 화살표 함수로 작성하면 어떻게 되나?

console.log("gate", gateCounter())

// const gate1counter = counter();
// console.log("🚀 ~ gate1counter:", gate1counter())
// const gate2counter = counter();
// console.log("🚀 ~ gate2counter:", gate2counter())
// console.log("🚀 ~ gate2counter:", gate2counter())

// async function af() {
//     const data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.json())
//     console.log("data : ", data)
//     return data;
// }

// const data = await af()
// console.log("🚀 ~ data:", data)


//즉시 실행 함수 버전
let data;
(async function af() {
    data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.json())
    console.log("data : ", data)
})().then();

// af()
console.log("🚀 ~ data:", data)

// setTimeout(function () {
//     console.log('xxxxxx')
// }, 1000)

const intl = setInterval(function (n) {
    console.log('xxxxxx', n)
}, 1000, 100)


setTimeout(() => clearInterval(intl), 5000)

// for (let i = 0; i < 10; i++) {
//     setTimeout(function () {
//         console.log('xxxxxxxxxx', i)
//     }, 1000)
// }


// for (var i = 0; i < 200; i++) {
//     setTimeout(function (n) {
//         console.log('xxxxxxxxxx', i, n)
//     }, 1000, i)
// }