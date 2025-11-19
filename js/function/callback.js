setImmediate(() => console.log('setImmediate', new Date()));
setTimeout(() => console.log('setTimeout', new Date()), 0);
// process.nextTick(() => console.log('nextTick'));
process.nextTick(function () { console.log('nextTick'); });

// i/o polling
const fs = require('fs'); // CJS
fs.readFile('hello.js', result => { //으아맆울 읽는 것도실행이다.
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')
    setTimeout(() => {
        console.log('setTimeout22');
    }, 0);
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')
    let j = 5;
    if (j == 5) {
        console.log('ㅋㅋㅋㅋㅋㅋㅋㅋㅋ')
    }

    setImmediate(() => {
        console.log('setImmediate22');
    });
    process.nextTick(() => console.log('nextTick22'));
});


// const f3 = () => (x) => x ** 3;
// function f3() {
//     r
}
// contf44() => { }