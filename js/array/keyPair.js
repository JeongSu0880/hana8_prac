const assert = require('assert');

const shift = (array, cnt = 1) => [array.slice(0, cnt), array.slice(cnt)];
const keyPair = (arr, n) => {
    const validArr = [...arr].sort((a, b) => a - b); // O(nlogn)
    const halfIdx = validArr.findIndex(v => v >= n / 2); // O(n)
    const [lower, higher] = shift(validArr, halfIdx)// O(n)

    let l_idx = lower.length - 1;
    let h_idx = 0;

    while (l_idx >= 0 && h_idx < higher.length) { //O(n)
        const sum = lower[l_idx] + higher[h_idx];

        if (sum == n) {
            const ret = [arr.indexOf(lower[l_idx]), arr.indexOf(higher[h_idx])];
            return ret;
        }

        sum > n ? l_idx-- : h_idx++;
    }
    return [];
}

console.log(keyPair([1, 3, 4, 5], 7))
console.log(keyPair([1, 4, 45, 6, 10, 8], 16))
console.log(keyPair([1, 2, 4, 3, 6], 10))
console.log(keyPair([1, 2, 3, 4, 5, 7], 9))

assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 9), [3, 4]); // [1,5]

//조합이 없을 수도 있잖아.
// 1/2을 해서 , 해당 인덱스를 찾아서 양 옆의 하나씩 조합으로 하면,,,, 좀 줄겠듯...