const assert = require('assert')
const user = { id: 1, name: 'Lee' };

Object.defineProperty(user, 'age', {
    get() { return this.x },
    set(age) { this.x = age }
},
)

console.log("🚀 ~ user:", user)


const n = 9.23

Object.defineProperties(Number.prototype, {
    length: {
        get() {
            return this.toString().length;
        }
    },
    point: {
        get() {
            const plen = this.toString.legth - Math.trunc(this).toString.length - 1;
            return +(this % 1).toFixed(plen);
        }
    }
})

console.log("nn>> ", n.length)
n.proint = 1;
console.log("pp<<", n.point)


const obj = { name: 'Kim', addr: 'Seoul', level: 1, role: 9, receive: false }
for (const k in obj) {
    console.log(k, ':', obj[k]);
}

Object.defineProperty(obj, 'level', { enumarable: false });

for (const [k, v] of Object.entries(obj)) {
    console.log(k, ':', v);
}


const kim = {
    nid: 3, nm: 'Kim',
    addr: { city: 'Busan', road: 'Haeundaero', zip: null }
};
const newKim1 = shallowCopy(kim);
newKim1.nid = 5;
assert.notEqual(kim.nid, newKim1.nid);

function shallowCopy(obj) {
    // return { ...obj };
    // return Object.assign({}, obj);
    const ret = {};
    for (const [k, v] of Object.entries(obj)) {
        ret[k] = v;
    }
    return ret;
}

// 2) 이하 deep copy


const newKim2 = deepCopy(kim);
newKim2.addr.city = 'Daegu';
assert.notEqual(kim.addr.city, newKim2.addr.city);

function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') return obj; // 근데 null은  obj이니까
    const ret = {};
    for (const [k, v] of Object.entries(obj)) {
        ret[k] = v;
    }
    return ret;
}
