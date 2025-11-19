const once = (f, rebirthDelay = 1000) => {
    let done = false;
    return function (...args) {
        if (done) return
        done = true;//뭔가 처리 여부의 플래그는 먼저 처리하는 것이 보통이다.
        setTimeout(() => (done = false), rebirthDelay);
        return f(...args);
    }//bind를 할라면 function, 아니면 화살표
}

const fn = once((x, y) =>
    `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);

/* // 내정답
function once(cb, delay) {
    let called = false;


    return setTimeout(function (...args) {
        if (called) return;
        called = true;
        return cb.call(this, ...args)
    }, delay)

}
*/

// test code
let cnt = 0;
const intl = setInterval(() => console.log(cnt++, fn(cnt, -cnt)), 200)