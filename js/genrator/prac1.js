const assert = require('assert');

class Subway {
    static #line2 = [
        '신도림',
        '성수',
        '신설동',
        '용두',
        '신답',
        '용답',
        '시청',
        '충정로',
        '아현',
        '이대',
        '신촌',
        '공항철도',
        '홍대입구',
        '합정',
        '당산',
        '영등포구청',
        '문래',
        '대림',
        '구로디지털단지',
        '신대방',
        '신림',
        '봉천',
        '서울대입구',
        '낙성대',
        '사당',
        '방배',
        '서초',
        '교대',
        '강남',
        '역삼',
        '선릉',
        '삼성',
        '종합운동장',
        '신천',
        '잠실',
        '잠실나루',
        '강변',
        '구의',
        '건대입구',
        '뚝섬',
        '한양대',
        '왕십리',
        '상왕십리',
        '신당',
        '동대문역사문화공원',
        '을지로4가',
        '을지로3가',
        '을지로입구'
    ]

    constructor(start, end) {
        this.s = Subway.#line2.indexOf(start)
        this.e = Subway.#line2.indexOf(end)
    }

    get line2() {
        return Subway.#line2;
    }

    *[Symbol.iterator]() {
        let i = 0;
        let subLen = Subway.#line2.length

        while (i < subLen) {
            let idx = this.s + i < subLen ? this.s + i : (this.s + i) % subLen
            yield Subway.#line2[idx]
            if (idx == this.e) break;
            i++;
        }
    }
}




const routes1 = new Subway('문래', '신림');
console.log([...routes1]);
assert.deepStrictEqual(
    [...routes1],
    ['문래', '대림', '구로디지털단지', '신대방', '신림']
);

const it1 = routes1[Symbol.iterator]();
['문래', '대림', '구로디지털단지', '신대방', '신림'].forEach((value, i) => {
    assert.deepStrictEqual(it1.next(), { value, done: false });
    console.log(i, routes1.toString());
});
assert.deepStrictEqual(it1.next(), { value: undefined, done: true });

const routes2 = new Subway('구로디지털단지', '성수'); // 32개 정거장
routes2.iterator().next();
assert.strictEqual(
    routes2.toString(),
    '구로디지털단지역에서 성수역까지 가는 열차이며, 현재 신대방역입니다'
);
console.log([...routes2]); // ['신대방', ..., '성수']
const it2 = routes2[Symbol.iterator]();
while (true) {
    const x = it2.next();
    console.log(x);
    if (x.done) break;
}

const route3 = new Subway('문래', '합정'); // 46개 정거장이면 통과!
assert.strictEqual([...route3].length, 46);
const route4 = new Subway('신도림', '을지로입구'); // 48개 정거장이면 통과!
assert.strictEqual([...route4].length, 48);


// const routes = new Subway('문래', '신림');
// const it1 = routes[Symbol.iterator]();
// console.log([...routes]); // [ '문래', '대림', '구로디지털단지', '신대방', '신림' ]
// console.log(it1.next()); // { value: '문래', done: false }...
// console.log(it1.next()); // { value: '신림', done: false }
// console.log(it1.next()); // { value: undefined, done: true }
// console.log(it1.next()); // { value: undefined, done: true }
// console.log(it1.next()); // { value: undefined, done: true }
// console.log(it1.next()); // { value: undefined, done: true }
// console.log(it1.next()); // { value: undefined, done: true }
// console.log(it1.next()); // { value: undefined, done: true }


// const routes2 = new Subway('구로디지털단지', '성수');  // 32개 정거장
// console.log([...routes2]); // ['구로디지털단지', '신대방', ..., '성수']
// const it2 = routes2[Symbol.iterator]();
// while (true) {
//     const x = it2.next();
//     console.log(x);
//     if (x.done) break;
// }
// const route3 = new Subway('문래', '합정');  // 46개 정거장이면 통과!
// const it3 = route3[Symbol.iterator]();
// let i = 0;
// while (true) {
//     i++;
//     const x = it3.next();
//     console.log(x);
//     if (x.done) {
//         break;
//     }
// }
// const route4 = new Subway('신도림', '을지로입구'); // 48개 정거장이면 통과!
// const it4 = route4[Symbol.iterator]();
// while (true) {

//     const x = it4.next();
//     console.log(x);
//     if (x.done) break;
// }


// 은닉성 보장해야함.

//1. startIdx, endIdx를 잡을 필요가 없다. 