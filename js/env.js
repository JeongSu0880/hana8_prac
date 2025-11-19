function counter() {
    let count = 0;
    return function X() {
        count += 1;
        return count;
    };
}

function example() {
    var counter1 = counter();
    return counter1();
}
const counter2 = counter();
// console.log(counter1());  // 1
// console.log(counter1());  // 2
console.log(counter2());  // 1
// console.log(counter1());  // 2

console.log(example());
console.log(example());
console.log(example());
console.log(example());
