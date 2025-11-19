const dog = {
    name: 'Maxx',
    showMyName() {
        console.log(`My name is ${this.name}.`);
    },
    whatsYourName() {
        // setTimeout(this.showMyName(), 1000);
        // setTimeout(this.showMyName.bind(this), 1000);
        // var self = this;
        // setTimeout(function () {
        //     self.showMyName();
        // }, 1000); // 이때는 클로저가 됨..??????????

        setTimeout(() => {
            this.showMyName();
        }, 1000);
        //이건 백그라운드 함수 (host api) 환경? 브라우저나 node가 되는 것임.
    }
};

dog.whatsYourName();

// console.log("--------------------------");
// //function debouncf. fr , this를 가질 필요 없는 것들은 다 화살표 함수
// const debounce = (db, delay) => {
//     let timer;
//     return () => {
//         if (timer) { }
//         timer = setTimeout(db, delay)
//     }
// }

// const f = function () {
//     console.log('f>>', new Date())
// }
// const search = debounce(f, 200);

console.log('++++++++++++++++');
for (var i = 0; i < 5; i += 1) {
    // setTimeout(console.log, 100, i); // (나)
    // setTimeout(a => console.log(i), 100);
}

console.log('========================');
// function debounce() {}
const debounce = (cb, delay) => {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(cb.bind(this), delay, ...args);
    };
};
const f = function (a, b) {
    console.log('f>>', new Date(), a + b, this.x);
};

const throttle = (cb, delay) => {
    let timer;
    return function (...args) {
        if (timer) return;
        timer = setTimeout(() => {
            cb.call(this, ...args);
            // cb.apply(this, args);
            timer = undefined;
        }, delay);
    };
};

// const search = debounce(f, 200);
const search = throttle(f, 200);
let cnt = 0;
const intl = setInterval(() => {
    console.log('intl', cnt, new Date());
    if (++cnt > 10) clearInterval(intl);
    search.bind({ x: 999 })(1, 2);
}, 100);


