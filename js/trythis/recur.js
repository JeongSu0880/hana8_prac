function makeReverseArrayTCO(n, arr = []) {
    if (n === 0) return arr;

    arr = [...arr, n];

    return makeReverseArrayTCO(n - 1, arr)
}

console.log(makeReverseArrayTCO(10))


function makeArrayTCO(n, arr = []) {
    if (n === 0) return arr;

    arr = [n, ...arr];

    return makeArrayTCO(n - 1, arr)
}

console.log(makeArrayTCO(10))

function makeArray(n) {
    if (n === 1) return [1];
    return [...makeArray(n - 1), n];
    // [10] --> [10, 9] --->   
    // return Array.from( {length:n}, (_, i) => i + 1);
}

console.log(makeArray(10))


// 사실 ...의 효율이 많ㅇ티 떨어진다. 계속 힙에 새로 할당하니까