const randTime = (sec: number) =>
    new Promise<number>(resolve => {// 뭐가 더 나을까? 안하는거? 하는거?
        // console.log('🚀 randTime:', sec);
        setTimeout(resolve, sec * 1000 * Math.random(), sec);
    });
// Promise를 쓸 때 타입을 정의하지 않아도 됨. 내부적으로 resolve는 unknown, reject는 any를 사용하기 때문에 타입에 어긋나는 일은 없지만, 나중에 어딘가에서 사용할 때 타입 내로잉을 잘 해줘야 할 듯.
type Success = {
    status: string,
    value: unknown
}

type Fail = {
    status: string,
    reason: any
}
// 타입 정의
//ㅑ 내가 한 방식이 뭔가.. 연결성이 없는 느낌이 들어 
// 그때 그때 타입을 맞춰준 느낌!!!!
const promiseAllSettled = (parr: Promise<unknown>[]) =>
    new Promise(resolve => {
        let results: (Success | Fail)[] = [];
        let runCnt = 0;
        for (let i = 0; i < parr.length; i++) {
            // non null assertion 말고 변수를 따로 지정해서 해당 변수의 타입을 정의할 때 null이 아님을 보장해주는 방법도 있다.
            parr[i]!
                .then(value => {
                    results[i] = { status: 'fulfilled', value };
                })
                .catch(reason => {
                    results[i] = { status: 'rejected', reason };
                })
                .finally(() => {
                    if (++runCnt === parr.length) resolve(results);
                });
        }
    });

Promise.allSettled([randTime(1), Promise.reject('RRR'), randTime(3)]).then(
    orgArr => {
        console.log('orgArr>>', orgArr);
        promiseAllSettled([randTime(1), Promise.reject('RRR'), randTime(3)])
            .then(array => {
                console.table(array);
                console.log('여긴 과연 호출될까?111!');
            })
            .catch(error => {
                console.log('allSettled-reject!!!!!!>>', error);
            });
    }
);

const promiseAll = (parr: Promise<unknown>[]) =>
    new Promise((resolve, reject) => {
        const results: unknown[] = [];
        let runCnt = 0;
        for (let i = 0; i < parr.length; i++) {
            parr[i]!
                .then(res => {
                    results[i] = res;
                    if (++runCnt === parr.length) resolve(results);
                })
                .catch(reject);
        }
    });//unknown 을 쓰지 말고 제너릭을 사용해!

Promise.all([randTime(1), randTime(2), randTime(3)]).then(orgArr => {
    console.log('🚀 ~ orgArr:', orgArr);
    promiseAll([randTime(1), randTime(2), randTime(3)])
        .then(arr => {
            console.table(arr);
            // assert.deepStrictEqual(arr, orgArr);
        })
        .catch(console.error);
});

Promise.all([randTime(2), Promise.reject('RRR'), randTime(2.5)])
    .then(orgArr => {
        promiseAll([randTime(11), Promise.reject('RRR'), randTime(33)])
            .then(array => {
                console.log('여긴 과연 호출될까?!');
            })
            .catch(error => {
                console.log('reject!!!!!!>>', error);
            });
    })
    .catch(err => {
        console.log('orgCatch>>', err);
        // assert.strictEqual(err, 'RRR');
    });

// new Promise((resolve) => randTime().then(resolve))
async function f() {
    const r1 = await randTime(1);
    console.log('🚀 ~ r1:', r1);
    return r1;
}
function f2() {
    return new Promise(resolve =>
        randTime(1).then(r2 => {
            console.log('🚀 ~ r2:', r2);
            resolve(r2);
        })
    );
}
f();
f2();

const myFetch = async (url: string) => {
    const res = await fetch(url);
    const rrr = await res.json();
    console.log('🚀 ~ rrr:', rrr);
    return rrr;
};

const myFetch2 = async (url: string) => fetch(url).then(res => res.json());

function iter(vals: number[]) {
    let i = -1;
    return {
        next() {
            i += 1;
            return { value: randTime(vals[i]!), done: i >= 3 };
        },
    };
}

(async function () {
    const it = iter([1, 2, 3]);
    console.time('iter');
    const { value } = it.next();
    console.log('🚀 ~ value:', await value);
    // console.log('11=', await it.next().value);
    // console.log('2=', await it.next());
    // console.log('3=', await it.next());
    // console.log('4=', await it.next());
    console.timeEnd('iter');
})();


//for문 안에 있는 배열? 에 대해서 타입스크립트가 타입 추론을 잘 못함. 

//과연 unknown을 덕지덕지 붙인 것이 타입을 잡은 것이 맞을까요? ㅎㅎ