const assert = require('assert');
const randTime = (value) =>
    new Promise((resolve) => setTimeout(resolve, 1000 * Math.random(), value));

const promiseAll = (parr) => new Promise((resolve, reject) => {
    let runCnt = 0;
    const results = [];
    for (let i = 0; i < parr.length; i++) {//순서를 보장하기 위해 let으로 for문
        parr[i].then(res => {
            results[i] = res;
            if (++runCnt === parr.length) resolve(results);
        }).catch(reject);
    }
    // const retArr;
    // randArr.forEach((rand) => {
    //     rand.then(() => {
    //         retArr.push(rand)
    //     })
    // })
    // return
})

const orgArr = Promise.all([randTime(1), randTime(2), randTime(3)]).then(orgArr => {
    console.log("🚀 ~ orgArr:", orgArr)
});

promiseAll([randTime(1), randTime(2), randTime(3)]).then(arr => {
    console.table(arr);
    assert.deepStrictEqual(arr, orgArr);
}).catch(console.error);

// const orgCatch = Promise.all([randTime(2), Promise.reject('RRR'), randTime(2.5)]).then(orgCatch => {
//     console.log("🚀 ~ orgCatch:", orgCatch)
// })

const promiseAllSettled = parr => new Promise((resolve) => {
    const results = [];
    let runCnt = 0;
    for (let i = 0; i < parr.length; i++) {
        parr[i].this(res => {
            results[i] = {
                status: 'fulfilled', value: res
            }
        }).catch(reason => {
            results[i] = { status: 'rejected', reason }
        }).finally(() => {
            if (++runCnt === parr.length) resolve(results)
        })
    }
})
//i가 있는데 왜 runCnt가 필요해?? => 비동기니까 실행 완료된 것들을 모아야 한다.


Promise.allSettled([randTime(1), Promise.reject('RRR'), randTime(3)]).then(orgArr => {
    promiseAllSettled([randTime(1), Promise.reject('RRR'), randTime(3)])
        .then(array => {
            console.table(array);
            console.log('여긴 과연 호출될까?!');
            assert.deepStrictEqual(array, orgArr);
        })
        .catch(error => {
            console.log('allSettled-reject!!!!!!>>', error);
        });
}
);
