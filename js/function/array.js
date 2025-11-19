const hong = { id: 1, name: 'Hong' };
const kim = { id: 2, name: 'Kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 4, name: 'Park' };
const users = [hong, kim, lee, park];

const find3 = a => a.id === 3;
const idxId2 = users.findIndex(find3);

// Try this: id가 전달 된 pid인 user를 반환하는 findId 함수를 작성하시오.
const findIdx = (pid) => () => users.find(user => user.id === pid);
// const user1 = findId(1);
// console.log(user1)
// console.log(findId(1))

// const findId = pid => user => user.id === pid
const findId = pid => ({ id }) => id === pid

const idxId11 = users.findLastIndex(findId(1));
console.log('🚀  idxId11:', idxId11);

const arr = Array.from({ length: 5 }, (_, i) => i + 1);

const isEven = n => n % 2 === 0;
const ev1 = arr.map((_a, i) => isEven(i));// 안쓰는 변수 _로 표기
const ev2 = arr.map((a, _i) => isEven(a));// 안쓰는 변수 _로 표기
// 받는 매개변수하고 주는 매개변수가 동일하면 매개변수 생략 가능!!!!!!!!!
console.log("🚀 ~ ev1:", ev1)
console.log("🚀 ~ ev2:", ev2)

const onlyEvens = arr.filter(isEven);
console.log("🚀 ~ onlyEvens:", onlyEvens)
//map은 arr의 개수만큼 무조건 리턴 , filter는 참인 경우만 "원소를" 리턴

arr.forEach(a => console.log(a, isEven(a)))
//ForEach는 리턴이 없고 그냥 루프 도는 것
// 그리고 forEach는 중지하지 못함 (중지 조건을 걸지 못핻)
for (const a of arr) {
    console.log("🚀 ~ a:", a)
    if (a === 3) break;
}
//d왜 성능을 요할 때는 이걸 써?? 뭐가 더 빨라?

const arr2 = [...arr]
console.log("🚀 ~ arr2:", arr2 === arr)
const arr3 = arr2.concat(arr) //새로운 배열을 준다.
console.log("🚀 ~ arr3:", arr3)

const a3 = arr.find(a => a === 3)
console.log("🚀 ~ a3:", a3)
//find는 처음부터 하나씩 돌다가 조건에 맞으면 리턴
const a2 = arr.findLast(a => a === 4)
console.log("🚀 ~ a2:", a2)

const eventOdds = Object.groupBy(arr, (a) => isEven(a) ? 'even' : 'odd')
console.log("🚀 ~ eventOdds:", eventOdds)

const jarr = arr.join("")
console.log("🚀 ~ jarr:", jarr)
//원소들을 합쳐서 스트링으로 만들어주고, ()d안에는 델리미터가 있다.

//          0, 1, 2, 3, 4, 5, 6
const a = [1, 2, 3, 4, 5, 6, 7]
//               3, 4
//        [1, 2, 3, 4, 3, 4, 7]
//length는 유지하면서
a.copyWithin(4, 2, 4);
console.log("🚀 ~ a:", a)
console.log("🚀 ~ a:", a)
