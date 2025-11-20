const assert = require('assert');

const hong = { id: 1, name: 'Hong', dept: 'HR' };
const kim = { id: 2, name: 'Kim', dept: 'Server' };
const lee = { id: 3, name: 'Lee', dept: 'Front' };
const park = { id: 4, name: 'Park', dept: 'HR' };
const ko = { id: 7, name: 'Ko', dept: 'Server' };
const loon = { id: 6, name: 'Loon', dept: 'Sales' };
const choi = { id: 5, name: 'Choi', dept: 'Front' };
const users = [hong, kim, lee, park, ko, loon, choi];

Array.prototype.uniqBy = function (prop) {
    const s = new Set(this.map((item) => item[prop]))
    return [...s]
}

Array.prototype.groupBy = function (prop) {

    // const map = new Map();
    const ret = {}
    for (const a of this) {
        const key = a[prop]
        // const value = map.get(a[prop])
        ret[key] ||= [];
        ret[key].push(a)
    }
    return ret
    // const ret = new Map();
    // this.forEach((item) => {
    //     const key = item[prop]
    //     if (!ret.has(key)) ret.set(key, item)
    //     else ret.get(key).push(item)
    //     console.log(ret.get(key))
    // })


}
console.log(users.groupBy('dept'))

console.log(Object.groupBy(users, user => user.dept))
assert.deepStrictEqual(users.uniqBy('dept'), ['HR', 'Server', 'Front', 'Sales'])
// assert.deepStrictEqual(users.groupBy('dept'),
//     Object.groupBy(users, user => user.dept));

// console.log(users.uniqBy('dept')) // [ 'HR', 'Server', 'Front', 'Sales' ]