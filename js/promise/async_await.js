const randTime = (value) =>
    new Promise((resolve) => setTimeout(resolve, 1000 * Math.random(), value));


// 내부적으로 new Promise((resolve) => randTime().then(resolve))
async function f() {
    const r1 = await randTime(1);
    return r1;
}

function f2() {
    return new Promise(resolve => randTime(1).then(res => {
        resolve(res)
    }))
}
f();
f2()

const myFetch = async url => {
    const ret = await fetch(url);
    return ret.json();
}

const myFetch2 = async (url) => fetch(url).then(res => res.json())

//어차피 프로미스를 리턴하는데, awit을 슬 필요 없다.
const getAllUsers = (sql) =>
    new Promise((resolve, reject) =>
        query.execute(sql, (err, rs) => {
            if (err) reject(err);

            const results = [];
            (async function () {
                do {
                    const row = await rs.next(); // promise
                    if (!row) break;
                    results.push(row);
                } while (true);
            })();
        })
    );//즉시 실행 함수로 곡 바꿔야 됨??

function iter(vals) {
    let i = -1;
    return {
        async next() {
            i += 1;
            return { value: await afterTime(vals[i]), done: i >= 3 };
        },
    };
}

// (async function () {

//     const it = iter([1, 2, 3]);
//     console.time('iter');
//     console.log('1=', await it.next());
//     console.log('2=', await it.next());
//     console.log('3=', await it.next());
//     console.log('4=', await it.next());
//     console.timeEnd('iter');
// })

(async function () {
    const it = iter([1, 2, 3]);
    console.time('iter');
    console.log('1=', await it.next());
    console.log('2=', await it.next());
    console.log('3=', await it.next());
    console.log('4=', await it.next());
    console.timeEnd('iter');
})();

