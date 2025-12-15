// export { }

// declare global {
//     interface Array<T> {
//         firstObject: T;
//         lastObject: T;
//         mapBy: (prop: string) => T[];
//         filterBy: (prop: string, value: T[keyof T], isIncludes?: boolean) => T[];
//         rejectBy: (prop: string, value: T[keyof T], isIncludes?: boolean) => T[]; //value 의 타입을 어떻게 설정해야하지? keyof T!!
//         findBy: (prop: string, value: T[keyof T]) => T;
//         sortBy: (prop: string) => T[];
//         groupBy: (gfn: (a: string) => string) => { string: T[] }; //이거 반환값을 뭘로 줘야하지? T[]가 여러개 묶인 배열인디,,,
//     }
// }

// Array.prototype.mapBy = function (prop: string) {
//     return this.map(a => a[prop]);
// };
// //호출되는 시점에 T가 정의되니까 지금은 any인게 맞나.

// Array.prototype.filterBy = function (prop, value, isIncludes = false) {
//     type cbType<C> = (a: C) => boolean

//     const cb: cbType<typeof this[0]> = isIncludes //타입이 어쨋든 추론이 되면 되니까 ,,,,ㅋ..
//         ? a => a[prop]?.includes(value)
//         : a => a[prop] === value;

//     return this.filter(cb);
// };

// Array.prototype.rejectBy = function (prop, value, isIncludes = false) {

//     const cb = isIncludes //굳이 함수 시그니처를 쓸 필요가 없다. -> this[0]은 써도 괜찮은 방법인가???
//         ? (a: typeof this[0]) => !a[prop]?.includes(value)
//         : (a: typeof this[0]) => a[prop] !== value;

//     return this.filter(cb);
// };

// Array.prototype.findBy = function (prop, value) { //왜 여기의 a는 타입을 안 정해줘도 되는데 위의 콜백함수의 a는 타입을 정해줘야해?? -> find 함수나 map 함수 안에서 접근하니거니까 타입이 추론되어서!!
//     return this.find(a => a[prop] === value);
// };

// Array.prototype.sortBy = function (prop) {
//     // name | name:desc | name:asc
//     const [key, direction = 'asc'] = prop?.split(':');
//     const dir = direction.toLowerCase() === 'desc' ? -1 : 1;
//     // console.log('🚀  dir:', dir, prop);
//     return this.sort((a, b) => (a[key] > b[key] ? dir : -dir));
// };

// Array.prototype.groupBy = function (gfn) {
//     const ret: { string: typeof this[0] } = {};
//     for (const a of this) { //여기에서 this는 뭐야?
//         const k = gfn(a); //gfn은 a라는 prop을 받고  { dept }) => dept 이런 형태처럼 속성 이름을 받고 그 이름을 다시 반환
//         ret[k] ||= [];
//         ret[k].push(a);
//     }

//     return ret;
// };

// Object.defineProperties(Array.prototype, {
//     firstObject: {
//         get() {
//             return this[0];
//         },
//         set(value) {
//             this[0] = value;
//             // this.with(0, value); // pure fn
//         },
//     },
//     lastObject: {
//         get() {
//             return this.at([-1]);
//         },
//         set(value) {
//             this[this.length - 1] = value;
//             // this.with(-1, value);
//         },
//     },
// });

// const hongx = { id: 1, name: 'Hong' };
// const kimx = { id: 2, name: 'Kim' };
// const leex = { id: 3, name: 'Lee' };
// const users = [hongx, leex, kimx];

// console.log(users.mapBy('id')); // [1, 3, 2];
// console.log(users.mapBy('name')); // ['Hong', 'Lee', 'Kim']);
// console.log(users.filterBy('id', 2)); // [kim]);
// console.log(users.filterBy('name', 'i', true)); // [kim]
// console.log(users.rejectBy('id', 2)); // [hong, lee]
// console.log(users.rejectBy('name', 'i', true)); // [hong, lee]
// console.log(users.findBy('name', 'Kim')); //  kim;
// console.log(users.sortBy('name:desc')); //  [lee, kim, hong];
// console.log(users.sortBy('name')); // [hong, kim, lee]
// console.log(users.groupBy(({ dept }) => dept));
// /*
// Server: [
//   { id: 1, name: 'Hong', dept: 'Server' },
//   { id: 2, name: 'Kim', dept: 'Server' },
// ],
// Client: [
//   { id: 3, name: 'Lee', dept: 'Client' }
// ],
// */

// console.log('first/last=', users.firstObject.name, users.lastObject.name); // hong/lee
// users.firstObject = kimx;
// users.lastObject = hongx;
// console.log('first/last=', users.firstObject.name, users.lastObject.name); // kim/hong

// //infer를 사용하기
// //extends를 쓰자.