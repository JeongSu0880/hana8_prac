var x;
// let y hoisting
/*  여기까지 메모리 creation phase  */
x = 1;
// var x;
f();
function f() {
    console.log('fffff')
} // 함수는 객체라 이거에 대한 뭐뭐,, 뭐,, 뭐,, 뭐 어ㅉ너다고?
let y; // 에러 -> 그런데 let은 이 문을 남겨놓고 가기 때문에 이 전에 사용하려고 하면 unInitialized 에러가 난다.
y = 9

