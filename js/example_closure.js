function discount(dcRate = 0.1) {
    // const dcRate = 0.1;
    return function (price) {
        return price * (1 - dcRate);
    }
}

const discounter = discount();

console.log(discounter(500));
console.log(discounter(1000));

const items = [
    { name: '사과', price: '20000' },
    { name: '바나나', price: '2000' },
    { name: '복숭가', price: '2000000000' }
]

// for (const item of items) {
//     console.log(`${item.name}의 가격은? ${discounter(item.price)}`)
// }

for (const { name, price } of items) {
    console.log(`${name}의 가격은? ${discounter(price).toLocaleString()}`)
}


console.log('-------------------------------------------------------------------------------')

const actions = ['입장', '입장', '입장', '퇴장', '입장', '퇴장']; // Status Queue

let cnt = 0;

const counter = currentCount();
const { connect, disconnect, getCount } = currentCount();
// const [con, dis, getC] = currentCount();
//뭔 차이냐면~ 배열 형태는 내가 이름을 아무렇게나 바꿔도 된다 
// 이름을 바꿔야 할 때 쓰기 유용하다.

for (const status of actions) {
    if (status === '입장') connect();
    else disconnect();
}


// let cnt = 0;//요렇게 하면 ?? 에러 -> cnt의 TDZ에 걸린다! (메모리 공간은 있지만 초기화 되어있지 않은 상태


function currentCount() {
    let cnt = 0;
    function connect() {
        cnt++;
    }
    function disconnect() {
        cnt--;
    }
    function getCount() {
        return cnt;
    }

    return {
        connect,
        disconnect,
        getCount: getCount
    }
    // return [connect, disconnect, getCount];
    //뭔차이냐면~
}

console.log(getCount());