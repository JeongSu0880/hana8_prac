const arr = [1, 2, 3, 4, 3, 4, 7]

let arr2 = arr
arr.push('02', '01', '03', 'a', 'c', 'b', 'aa')
console.log("🚀 ~ arr:", arr)

const s2 = arr2.sort((a, b) => {
    // console.log(a, b)
    return a < b ? -1 : 1
})
console.log("🚀 ~ s2:", s2)
arr2 = arr
const s3 = arr2.sort((a, b) => a == b ? 0 : (a > b ? 1 : -1))
console.log("🚀 ~ s3:", s3)


const s4 = [...arr].sort((a, b) => a < b ? -1 : 1);
const s5 = [...arr].sort((a, b) => (a >= b ? 1 : -1));

console.log(s4);
console.log(s5);