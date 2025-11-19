
// 91 - 100 : A
// 81 - 90 : B
// 71 - 80 : C
// 나머지 D


const score = 88
let rate = null;
let grade = 'D';
const value = score % 10 == 0 ? Math.floor(score / 10) - 1 : Math.floor(score / 10);
console.log("🚀 ~ value:", value)

switch (value) {
    case 9:
        rate = 'A';
        break;
    case 8:
        rate = 'B';
        break;
    case 7:
        rate = 'C';
        break;
    default:
        rate = 'D';
}

console.log("등급은요?! :", rate)
