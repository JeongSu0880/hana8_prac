const { start } = require("repl");
const { arrayBuffer } = require("stream/consumers");

let arr = [1, 2, 3, 4]

const push = (array, ...args) => [...array, ...args];
const pop = (array, cnt = 1) => {
    if (cnt <= 0) return array;
    return (cnt === 1 ? array.at(-1) : array.slice(-cnt))
}
const newArr2 = pop(arr)
console.log("🚀 ~ arr:", arr)
console.log("🚀 ~ newArr2:", newArr2)

const unshift = (array, ...args) => [...args, ...array];

const shift = (array, cnt = 1) => [, array.slice(cnt)];
const [removed, left] = shift(arr, 2)
//이런식으로 쓸 일이 실무에서는 많다.
const newArr3 = unshift(arr, 0, 1, 2, 2)
console.log("🚀 ~ arr:", arr)
console.log("🚀 ~ newArr3:", newArr3)

const newArr4 = shift(arr)
console.log("🚀 ~ arr:", arr)
console.log("🚀 ~ newArr4:", newArr4)

console.log("======================2222222222222222222=============================")

// const deleteArray = (array, startOrKey, endOrValue) => {
//     if (typeof startOrKey === 'number') {
//         array.filter((__, i) => i < startOrKey || i >= endOrValue)
//     }

//     return array.filter((a) => a[startOrKey] !== endOrValue)
// }

// const deleteArray = (array, startOrKey, endOrValue) => array.filter(typeof startOrKey === 'number' ? (_, i) => i < startOrKey || i >= endOrValue : a => a[startOrKey] !== endOrValue)
// 한 줄로 짜는법 ㅎㅎ

const deleteArray = (array, startOrKey, endOrValue = array.length) => {
    let fn;
    if (typeof startOrKey === 'number')
        fn = (_, i) => i < Math.min(startOrKey, endOrValue) || i >= Math.max(startOrKey, endOrValue);
    else fn = a => a[startOrKey] !== endOrValue
}
// 함수로 하는 법

console.log("-----------------33333333333333333333-----------------------")

// arr = [1, 2, 3, true]
arr.pop()
arr.push(true)
arr.push(null)
console.log("🚀 ~ arr:", arr)


// const ret1 = arr.map((a) => String(a))  // String(n)
const ret1 = arr.map(String) //최고의 코드래 (받은 매개변수 == 주는 매개변수면 생략)

//.toString() 하면 널 처리가 안되니까
// assert.deepStrictEqual(ret1, ['1', '2', '3', 'true', 'null']);

const classNames = (...args) => {
    const newArgs = [...args.map(a => a.trim()).filter(Boolean)] //(falsy 값을 걸르는 것. a => !!a)
    let newArr = newArgs.join(' ')
    return newArr
};
const ret2 = classNames('', 'a b c', 'd', '', 'e');
// assert.strictEqual(ret2, 'a b c d e');

console.log("-------------------444444444444444----------------------")

const hong = { id: 1, name: 'Hong' };
const choi = { id: 5, name: 'Choi' };
const kim = { id: 2, name: 'kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 4, name: 'Park' };
users = [kim, lee, park];

console.log('****>>', Array.prototype === users.__proto__) //프로토타입을 함수로 조작하면 안됨.

// users.__proto__.addUser = function (newer) {
//     return [...this, newer]
// }//BAD

users.addUser = function (newer) {
    return [...this, newer];
}

// Object.defineProperty(users, 'addUser', {
//     enumerable: false
// })
// Adduser 숨기기...(?)

users.removeUser = function ({ id: toDelId }) {
    return this.filter(({ id }) => id !== toDelId)
}


// Object.defineProperty(users, 'removerUSer', {
//     enumerable: false
// })

users.changeUser = function (from, to) {
    return this.map(a => a.id === from.id ? to : a)
}

console.log('user - functions>>', users.filter(u => {
    console.log(u, typeof u);
    return typeof u === 'funciton'
}))

//사실은 enumerable을 false로 하지 않아도 안보임 똑똑하 자바스크립트

// Object.keys(users).filter(isNaN).forEach(fname => Object.defineProperties(users, fname, { enumerable: false }))

// assert.deepStrictEqual(addUser(hong), [kim, lee, park, hong]);
// assert.deepStrictEqual(users, [kim, lee, park]);

// assert.deepStrictEqual(removeUser(lee), [kim, park]);
// assert.deepStrictEqual(users, [kim, lee, park]);

// assert.deepStrictEqual(changeUser(kim, choi), [choi, lee, park]);
// assert.deepStrictEqual(users, [kim, lee, park]);

