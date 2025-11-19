

const memoizedTable = {};
//{2: 2, 3: 6, 4 : 24}
//이런식으로 계산했던 것을 쫘아악 채워나갈 것임.

let runCnt = 0;
function memoFactorial(n) {
    runCnt++;
    if (n === 1) return 1;

    return memoizedTable[n] ?? (memoizedTable[n] = n * factorial(n - 1));
    // return memoizedTable[n] ? memoizedTable[n] : memoizedTable[n] = n * memoFactorial(n - 1);
}

console.log(memoFactorial(3), runCnt);
runCnt = 0;
console.log(memoFactorial(5), runCnt);
runCnt = 0;
console.log(memoFactorial(10), runCnt);
runCnt = 0;

function memoized(fn) {
    const memoizedTable = {};

    return function (k) {
        return memoizedTable[n] ?? (memoizedTable[n] = fn(k));
    }
}

// function facto(k) { return k; }
const memoizedFactorial = memoized(function (k) {
    if (k === 1) return 1;
    return k * memoizedFactorial(k - 1);
});

//클로저 함수를 memoizedFactorial에 담아놨기 때문에!!!!!!

console.log('------------memoized--------------')

console.log(memoFactorial(3), runCnt);
runCnt = 0;
console.log(memoFactorial(5), runCnt);
runCnt = 0;
console.log(memoFactorial(10), runCnt);
runCnt = 0;
