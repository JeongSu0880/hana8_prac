const before = () => console.log('before....');
const after = (result) => console.log('after...', result);

const someFn = (name, greeting) => `${greeting}, ${name}`;
const someFn2 = (id, nickname, email, level) => `${id}/${nickname}/${email}/${level}`;

const template = (f) => (...args) => {
    before();
    f(...args);
    after();
}
const temp = template(someFn);  // before → someFn → after 실행
const temp2 = template(someFn2);  // before → someFn2 → after 실행

console.log('temp1>>', temp('sico', 'hello'));
console.log('temp2>>', temp2(1, 'sico', 'sico@gmail.com', 5));


const weeks = ['일', '월', '화', '수', '목', '금', '토'];

const getNextWeek = (() => {
    let widx = -1;
    return () => {
        widx += 1;
        if (widx >= weeks.length) widx = 0;
        return `${weeks[widx]}요일`;
    }
})(); // 클로저 형태로 바꿈 -> 그리고 즉시 실행 함수를 사용하면 됨.

let cnt = 0;
const intl = setInterval(() => {
    // widx += 2; // side-effect!
    console.log('call', cnt, getNextWeek());
    if ((cnt += 1) === 8) clearInterval(intl);
}, 1000);
