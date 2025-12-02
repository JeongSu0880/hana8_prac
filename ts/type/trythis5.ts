// const assert = require('assert');
import assert from 'assert' // 왜 에러? node는 ts가 아님. 
const arr = [1, 2, 3, 4];
const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
const users = [Hong, Kim, Lee];
// 4
// type numarr = number[];
type utype = {
    id: number | string,
    name: number | string
}
type obarr = utype[]

const deleteArray = (array: number[] | obarr, startOrKey: number | string, endOrValue: number | string = array.length) =>
    array.filter(
        typeof startOrKey === 'number' && typeof endOrValue === 'number'
            ? (_, i) =>
                i < Math.min(startOrKey, endOrValue) ||
                i >= Math.max(startOrKey, endOrValue)
            : (_, i) => {
                type keys = keyof typeof array;
                if (startOrKey in array)
                    return true;
                else return false
            }
    );

// const arr: number[] = [1, 2, 3, 4];
console.log(deleteArray(arr, 2)); // [1, 2]
console.log(deleteArray(arr, 1, 3)); // [1, 4]
console.log(arr); // [1, 2, 3, 4]

// const users: obarr = [{ id: 1, name: 'Hong' }, { id: 2, name: 'Kim' }, { id: 3, name: 'Lee' }];

console.log(deleteArray(users, 2)); // [Hong, Kim]
console.log(deleteArray(users, 1, 2)); // [Hong, Lee]
console.log(deleteArray(users, 'id', 2)); // [Hong, Lee]
console.log(deleteArray(users, 'name', 'Lee')); // [Hong, Kim]


assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
