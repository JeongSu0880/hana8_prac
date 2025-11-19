function sum100() {
    let sum = 0;
    for (let i = 1; i <= 100; i++) {
        sum += i;
    }
    return sum;
}

console.log('sum 100 >>', sum100());

function sum100recur(n = 1) {
    if (n == 100) {
        return 100
    }

    return n + sum100recur(n + 1)
    // 1 + 2 + 3 + 4.....
}

console.log('sum 100 recur >>', sum100recur());


function factorial(n) {
    let ret = 1
    while (n > 1) {
        ret *= n;
        n--;
    }

    return ret;
}

console.log('factorial 5 >>', factorial(5));

function factorialRecur(n) {
    if (n === 1) return n;

    return n *= factorialRecur(n - 1);
}

console.log('factorial recur 5 >>', factorialRecur(5));


function factorialTCO(n, acc = 1) {
    if (n === 1) return acc;
    return factorialTCO(n - 1, acc * n);
    // f(4, 5) -> f(3, 4 * 5) -> f(2, 3 * 4 * 5)
}