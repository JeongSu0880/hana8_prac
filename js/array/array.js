const arr = [1, 2, 3, 4, 3, 4, 7]

let b = arr
arr.push('02', '01', '03', 'a', 'c', 'b', 'aa')
const s1 = b.sort();
console.log("🚀 ~ s1:", s1)

b = arr
console.log("🚀 ~ b:", b)

// const s2 = b.sort((a, b) => a - b)// 이것보다
const s2 = b.sort((a, b) => {
    console.log(a, b)
    return a < b ? -1 : 1
})
// const s2 = b.sort((a, b) => (a < b ? -1 : 1))


console.log("🚀 ~ s2:", s2)

b = arr
const s4 = b.sort((a, b) => (a < b ? 1 : -1))


console.log('-------------------------------------------')
//예전에는 shallow copy할 때 slice를 활용하기도 했지만 지금은 spread 연산 사용
const shallow = arr.slice()
const shallow2 = [...arr]
console.log("🚀 ~ shallow:", shallow)

const sp1 = arr.splice(1, 3) //원본이 바뀜
console.log("🚀 ~ sp1:", sp1, arr)

arr.splice(1, 0, ...sp1)
console.log("🚀 ~ arr:", arr)

const sp2 = arr.splice(2, 4)
console.log("🚀 ~ sp2:", sp2)
arr.splice(2, 0, ...sp2)
console.log("🚀 ~ arr:", arr)



const re1 = [1, 2, 3, 4, 5].reduce((acc, a) => ({ [`id${a}`]: a }))
console.log("🚀 ~ re1:", re1)
const re2 = [1, 2, 3, 4, 5].reduce((acc, a) => ({ ...acc, [`id${a}`]: a }))
console.log("🚀 ~ re2:", re2)
const re3 = [1, 2, 3, 4, 5].reduce((acc, a) => ({ ...acc, [`id${a}`]: a }), {})
console.log("🚀 ~ re3:", re3)

const re4 = [1, 2, 3, 4, 5].reduce((acc, a) => (acc + a), 0)
console.log("🚀 ~ re4:", re4)

const users = [{ id: 1, name: 'Hong' }, { id: 20, name: 'Kim' },
{ id: 3, name: 'Lee' }];

const users1 = users.reduce((acc, user) => `${acc} ${user.name}`)
console.log("🚀 ~ users1:", users1)
console.log("🚀 ~ users:", users) //초깃값을 안주면 인덱스 0이 초깃값

const users2 = users.reduce((acc, user) => `${acc} ${user.name}`, '')
console.log("🚀 ~ users2:", users2)

const objs = [{ id: 1 }, { name: 'Hong' }, { addr: 'Seoul', id: 5 }];
const obj1 = objs.reduce((acc, obj) => ({ ...acc, ...obj }), {})
console.log("🚀 ~ obj1:", obj1)
// Object.assign({}, ...objs) 랑 동일