const assert = require('assert');

const arr = [1, 2, 3, 4, 5];
const hong = { id: 1, name: 'Hing' };
const kim = { id: 2, name: 'Kim' };
const lee = { id: 3, name: 'Lee' };
const users = [hong, lee, kim];

// Array.prototype.mapBy = function (key) {
//     if (key === 'name') {
//         const ret = users.map((a) => a.name)
//         return ret
//     }
//     if (key === 'id') {
//         const ret = users.map((a) => a.id)
//         return ret
//     }
// }

Array.prototype.mapBy = function (prop) {
    return this.map(a => a[prop])
}

// Array.prototype.filterBy = function (key, value, b = true) {
//     if (key === 'id') {
//         return users.filter((a) => a.id === value)
//     }
//     if (key === 'name') {
//         return users.filter((a) => a.name.includes(value))
//     }
// }

Array.prototype.filterBy = function (prop, value, isIncludes = false) {
    const cb = isIncludes
        ? a => a[prop]?.includes(value)
        : a => a[prop] === value
    return this.filter(cb)
}

// Array.prototype.rejectBy = function (key, value, b = true) {
//     if (key === 'id') {
//         return users.filter((a) => a.id !== value)
//     }
//     if (key === 'name') {
//         return users.filter((a) => !a.name.includes(value))
//     }
// }

Array.prototype.rejectBy = function (prop, value, isIncludes = false) {
    const cb = isIncludes
        ? a => !(a[prop]?.includes(value))
        : a => a[prop] !== value
    return this.filter(cb)
}

// Array.prototype.findBy = function (key, value) {
//     if (key === 'id') {
//         return users.find((a) => a.id === value)
//     }
//     if (key === 'name') {
//         return users.find((a) => a.name === value)
//     }
// }

Array.prototype.findBy = function (prop, value) {
    return this.find(a => a[prop] === value)
}

// Array.prototype.sortBy = function (keyMethod) {
//     [key, method] = keyMethod.split(':')

//     if (key === 'id') {
//         return method === 'desc' ? users.sort((a, b) => a.id < b.id ? 1 : -1) : users.sort((a, b) => a.id < b.id ? -1 : 1)
//     }
//     if (key === 'name') {
//         return method === 'desc' ? users.sort((a, b) => a.name < b.name ? 1 : -1) : users.sort((a, b) => a.name < b.name ? -1 : 1)
//     }
// }

Array.prototype.sortBy = function (prop_dir) {
    const [prop, order = 'asc'] = prop_dir.split(':')
    const dir = order === 'desc' ? 1 : -1
    return this.sort((a, b) => a[prop] < b[prop] ? dir : -dir)
}


Object.defineProperties(Array.prototype, {
    firstObject: {
        get() {
            return this[0];
        },
        set(val) {
            this[0] = val
        }
    },

    lastObject: {
        get() {
            return this[this.length - 1];
        },
        set(val) {
            this[this.length - 1] = val
        }
    }
})

// console.log(users.filterBy('id', 2))


assert.deepStrictEqual(users.mapBy('id'), [1, 3, 2]);
assert.deepStrictEqual(users.mapBy('name'), ['Hing', 'Lee', 'Kim']);

assert.deepStrictEqual(users.filterBy('id', 2), [kim]);
assert.deepStrictEqual(users.filterBy('name', 'i', true), [hong, kim]); // key, value일부, isInclude

// assert.deepStrictEqual([arr.firstObject, arr.lastObject], [1, 5]);
assert.deepStrictEqual(users.rejectBy('id', 2), [hong, lee]);
assert.deepStrictEqual(users.rejectBy('name', 'i', true), [lee]);
assert.deepStrictEqual(users.findBy('name', 'Kim'), kim);
assert.deepStrictEqual(users.sortBy('name:desc'), [lee, kim, hong]);
assert.deepStrictEqual(users.sortBy('name'), [hong, kim, lee]);
assert.deepStrictEqual(users.firstObject, hong);
assert.deepStrictEqual(users.lastObject, lee);
users.firstObject = kim;
assert.deepStrictEqual(users.firstObject, kim);
users.lastObject = hong;
assert.deepStrictEqual(users.lastObject, hong);
