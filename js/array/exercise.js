const assert = require('assert');
const { start } = require('repl');
const arr2 = [1, 2, 3, 4, 5];
// ex1) [2,3]을 추출
const ex1 = arr2.slice(1, 3);
assert.deepStrictEqual(ex1, [2, 3]);

// ex2) [3]부터 모두 다 추출
const ex2 = arr2.slice(2);
assert.deepStrictEqual(ex2, [3, 4, 5]);

// ex3) [2,3,4] 제거하기
const ex3 = arr2.splice(1, 3);
assert.deepStrictEqual(ex3, [2, 3, 4]);
assert.deepStrictEqual(arr2, [1, 5]);

// ex4) 복원하기
const ex4 = arr2.splice(1, 0, ...ex3);
assert.deepStrictEqual(ex4, []);
assert.deepStrictEqual(arr2, [1, 2, 3, 4, 5]);

// ex5) [3] 부터 끝까지 제거하기
const ex5 = arr2.splice(2);
assert.deepStrictEqual(ex5, [3, 4, 5]);
assert.deepStrictEqual(arr2, [1, 2]);

// ex6) 복원하기
const ex6 = arr2.splice(2, 0, ...ex5);
assert.deepStrictEqual(ex6, []);
assert.deepStrictEqual(arr2, [1, 2, 3, 4, 5]);

// ex7) [1,2, 'X', 'Y', 'Z', 4, 5] 만들기
// - 방법1) 3부터 모두 지우고 'X', 'Y', 'Z', 4, 5 추가
const ex7 = arr2.splice(2, arr2.length, 'X', 'Y', 'Z', 4, 5);
assert.deepStrictEqual(arr2, [1, 2, 'X', 'Y', 'Z', 4, 5]);
// ==>  복원
arr2.splice(2, 5, ...ex7);
assert.deepStrictEqual(arr2, [1, 2, 3, 4, 5]);

// - 방법2) 3만 지우고 'X', 'Y', 'Z' 추가
const ex7_2 = arr2.splice(2, 1, 'X', 'Y', 'Z');
assert.deepStrictEqual(arr2, [1, 2, 'X', 'Y', 'Z', 4, 5]);
arr2.splice(2, 3, ...ex7_2);
assert.deepStrictEqual(arr2, [1, 2, 3, 4, 5]);


// ex8) 위 7번 문제를 splice를 사용하지 말고 작성하시오.
const ex8 = [...arr2.slice(0, 2), 'X', 'Y', 'Z', ...arr2.slice(3)];
assert.deepStrictEqual(ex8, [1, 2, 'X', 'Y', 'Z', 4, 5]);

// console.log('arr>>', arr2)
const ex9 = arr2.toSpliced(2, 1, 'X', 'Y', 'Z')// splice의 순수함수화
// console.log("🚀 ~ ex9:", ex9)

console.log("---------------------------------------------------------")

let arr = [1, 2, 3, 4]

const push = (() => {
    let newArr;

    return (arr, ...nums) => {
        newArr = [...arr, ...nums];
        return newArr
    }
})();

const newArr1 = push(arr, 1, 2, 3)
console.log("🚀 ~ newArr1:", newArr1)
console.log("🚀 ~ arr:", arr)

const pop = (() => {
    let newArr;

    return (arr, cnt = 1) => {
        newArr = arr.slice(0, arr.length - cnt);
        return newArr
    }
})();

const newArr2 = pop(arr)
console.log("🚀 ~ arr:", arr)
console.log("🚀 ~ newArr2:", newArr2)


const unshift = (() => {
    let newArr;

    return (arr, ...nums) => {
        newArr = [...nums, ...arr];
        return newArr
    }
})();

const newArr3 = unshift(arr, 0, 1, 2, 2)
console.log("🚀 ~ arr:", arr)
console.log("🚀 ~ newArr3:", newArr3)

const shift = (() => {
    let newArr;

    return (arr, cnt = 1) => {
        const arrcp = [...arr];
        newArr = [arrcp.splice(0, cnt), arrcp]
        return newArr
    }
})();

const newArr4 = shift(arr)
console.log("🚀 ~ arr:", arr)
console.log("🚀 ~ newArr4:", newArr4)


console.log("======================2222222222222222222=============================")

const deleteArray = (() => {
    let newArr;

    return (arr, startIdx, endIdx = Infinity) => {
        const arrcp = [...arr];
        console.log(arrcp)
        arrcp.splice(startIdx, endIdx - startIdx)
        return arrcp
    }
})();

const newArr5 = deleteArray(arr, 2)
const newArr6 = deleteArray(arr, 1, 3)
console.log("🚀 ~ newArr5:", newArr5)
console.log("🚀 ~ newArr6:", newArr6)

arr = [1, 2, 3, 4];
assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);    // 2부터 끝까지 지우고 나머지 리턴
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]); // 1부터 3미만까지 지우고 나머지 리턴
assert.deepStrictEqual(arr, [1, 2, 3, 4]);

const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
let users = [Hong, Kim, Lee];

assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
// assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
// assert.deepStrictEqual(deleteArray(users, 'name', 'Lee'), [Hong, Kim]);

console.log("-----------------33333333333333333333-----------------------")

// arr = [1, 2, 3, true]
arr.pop()
arr.push(true)
console.log("🚀 ~ arr:", arr)


const ret1 = arr.map((a) => a.toString());  // String(n)
assert.deepStrictEqual(ret1, ['1', '2', '3', 'true']);

const classNames = (...args) => {
    const newArgs = [...args.filter((arg) => arg != '')]
    let newArr = newArgs.join(' ')
    return newArr
};
const ret2 = classNames('', 'a b c', 'd', '', 'e');
assert.strictEqual(ret2, 'a b c d e');

console.log("-------------------444444444444444----------------------")

const hong = { id: 1, name: 'Hong' };
const choi = { id: 5, name: 'Choi' };
const kim = { id: 2, name: 'kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 4, name: 'Park' };
users = [kim, lee, park];

const addUser = (() => {
    let newUsers;

    return (user) => {
        newUsers = [...users, user];
        return newUsers;
    }
})()

const removeUser = (() => {
    let newUsers;

    return (user) => {
        newUsers = [...users.filter((u) => u != user)]
        return newUsers
    }
})()

const changeUser = (() => {
    let newUsers

    return (user1, user2) => {
        newUsers = [...users.map((a) => a === user1 ? user2 : a)]
        return newUsers
    }
})()

assert.deepStrictEqual(addUser(hong), [kim, lee, park, hong]);
assert.deepStrictEqual(users, [kim, lee, park]);

assert.deepStrictEqual(removeUser(lee), [kim, park]);
assert.deepStrictEqual(users, [kim, lee, park]);

assert.deepStrictEqual(changeUser(kim, choi), [choi, lee, park]);
assert.deepStrictEqual(users, [kim, lee, park]);

console.log("----------------------5555555555555555555-----------------------")

const reduce = () => {
    let ret;

    return (arr, fn, initValue) => {
        let arrcp = [...arr]
        arrcp.forEach((a, i) => arrcp[i + 1] = fn(arrcp[i]))
    }
}

reduce([1, 2, 3], (a, b) => a + b, 0);       // 6이면 통과!
// cf. [1,2,3].reduce((a,b) => a + b, 0);    // 6
reduce([1, 2, 3, 4, 5], (a, b) => a + b);    // 15면 통과!
reduce([1, 2, 3, 4, 5], (a, b) => a * b, 1); // 120이면 통과!
reduce([2, 2, 2], (a, b) => a * b);          // 8이면 통과!
reduce([3, 3, 3], (a, b) => a * b, 0);


console.log(' ================================ ')

const arr1 = [1, 2, 3, 4, 5];
const square = a => a ** 2;
const sqrt = n => Math.sqrt(n);
const cube = n => n ** 3;

const xr1 = arr.map(square).map(sqrt).map(cube);
assert.deepStrictEqual(xr1, [1, 8, 27, 64, 125]);

const xr2 = arr.map(a => [square, sqrt, cube].reduce((acc, fn) => fn(acc), a));
console.log('🚀  xr2:', xr2);
const xr3 = arr.map(a => [cube, square, sqrt].reduce((acc, fn) => fn(acc), a));
console.log('🚀  xr3:', xr3);
const xr4 = arr.map(a =>
    [square, cube, n => n + 1].reduce((acc, fn) => fn(acc), a)
);
console.log('🚀  xr4:', xr4);