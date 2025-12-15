const hongx = { id: 1, name: 'Hong' };
const kimx = { id: 2, name: 'Kim' };
const leex = { id: 3, name: 'Lee' };
const users = [hongx, leex, kimx];

export { }

declare global { //이걸 꼭 쓰는 이유 -> 타입스크립트 입장에서는 어떤 Array인지 모를 수 있기 때문에
    interface Array<T> {
        firstObject: T;
        lastObject: T;
        mapBy(prop: keyof T): T[];
        filterBy<K extends keyof T>(prop: K, value: T[K], isIncludes?: boolean): T[];
        rejectBy<K extends keyof T>(prop: K, value: T[K], isIncludes?: boolean): T[]; //value 의 타입을 어떻게 설정해야하지? keyof T!!
        findBy<K extends keyof T>(prop: K, value: T[K]): T;
        // sortBy(prop: keyof T | `${keyof T & string}:asc` | `${keyof T & string}:desc`): T[];
        sortBy(prop: keyof T | `${keyof T & string}:${'asc' | 'desc'}`): T[];
        groupByFn<K extends T[keyof T] & PropertyKey>(gfn: (a: T) => T[K]): Partial<Record<K, T[]>>; //이거 반환값을 뭘로 줘야하지? T[]가 여러개 묶인 배열인디,,,
    }
}

Array.prototype.mapBy = function (prop) {
    return this.map(a => a[prop]);
};
//호출되는 시점에 T가 정의되니까 지금은 any인게 맞나.

// //방법 1 위의 T를 가져오자
// Array.prototype.filterBy = function <T>(prop: keyof T, value: T[keyof T] & string, isIncludes = false) { //a가 any기 때문에 문제가 생기는 것.
//     const cb = isIncludes //타입이 어쨋든 추론이 되면 되니까 ,,,,ㅋ..
//         ? (a: T) => typeof a[prop] === 'string' && a[prop]?.includes(value)
//         : (a: T) => a[prop] === value;

//     return this.filter(cb);
// };

// //방법 2 방법1 + 한방에 cb에 정의
// Array.prototype.filterBy = function <T>(prop: keyof T, value: T[keyof T] & string, isIncludes = false) { //a가 any기 때문에 문제가 생기는 것.
//     const cb: (a: T) => boolean = isIncludes //타입이 어쨋든 추론이 되면 되니까 ,,,,ㅋ..
//         ? a => typeof a[prop] === 'string' && a[prop]?.includes(value)
//         : a => a[prop] === value;

//     return this.filter(cb);
// };

// 위의 방법 다 좋은 방법은 아님 타입 선언을 계속 다시 하는 거니까


Array.prototype.filterBy = function (prop, value, isIncludes = false) { //화살표 함수가 안되는 이유 -> this를 쓰지 못한다!
    return this.filter(a => isIncludes ? a[prop]?.includes(value) : a[prop] === value)
    // const cb: (a: typeof this[number]) => boolean = a => 
    //         isIncludes ? a[prop].includes(value) : a[prop] === value;

    // const cb: (a: typeof this[number]) => boolean = isIncludes // this[number] 로 하면 this 안의 모든 타입을 유니온
    //     ? a => a[prop]?.includes(value)
    //     : a => a[prop] === value;

    // return this.filter(cb);
};

Array.prototype.rejectBy = function (prop, value, isIncludes = false) {

    // const cb = isIncludes //굳이 함수 시그니처를 쓸 필요가 없다. -> this[0]은 써도 괜찮은 방법인가???
    //     ? (a: typeof this[0]) => !a[prop]?.includes(value)
    //     : (a: typeof this[0]) => a[prop] !== value;

    return this.filter(a => isIncludes ? !a[prop]?.includes(value) : a[prop] !== value);
};

Array.prototype.findBy = function (prop, value) { //왜 여기의 a는 타입을 안 정해줘도 되는데 위의 콜백함수의 a는 타입을 정해줘야해?? -> find 함수나 map 함수 안에서 접근하니거니까 타입이 추론되어서!!
    return this.find(a => a[prop] === value);
};

Array.prototype.sortBy = function (prop) {
    // name | name:desc | name:asc | name: 이런식으로 들오왔을때는?
    const [key, direction = 'asc'] = typeof prop === 'string' && prop.includes(':') ? prop.split(':') : [prop, 'asc']
    const dir = direction.toLowerCase() === 'desc' ? -1 : 1;
    // console.log('🚀  dir:', dir, prop);
    return this.sort((a, b) => (a[key] > b[key] ? dir : -dir));
};

// declare type PropertyLey = string |} number | symbol;

// Array.prototype.groupByFn<K extends T[keyof Tn] R properTtyKey> = function (gfn: T) => K{
//     const ret: { k: [] } = {};
//     for (const a of this) { //여기에서 this 는 뭐야?
//         const k = gfn(a); //gfn은 a라는 prop을 받고  { dept }) => dept 이런 형태처럼 속성 이름을 받고 그 이름을 다시 반환
//         ret[k] ||= [];
//         ret[k].push(a);
//     }

//     return ret;
// };

console.log(users.groupBy(({ dept }) => dept));
console.log(users.groupBy('dept'));

Object.defineProperties(Array.prototype, {
    firstObject: {
        get() {
            return this[0];
        },
        set(value) {
            this[0] = value;
            // this.with(0, value); // pure fn
        },
    },
    lastObject: {
        get() {
            return this.at([-1]);
        },
        set(value) {
            this[this.length - 1] = value;
            // this.with(-1, value);
        },
    },
});


console.log(users.mapBy('id')); // [1, 3, 2];
console.log(users.mapBy('name')); // ['Hong', 'Lee', 'Kim']);
console.log(users.filterBy('id', 2)); // [kim]);
console.log(users.filterBy('name', 'i', true)); // [kim]
console.log(users.rejectBy('id', 2)); // [hong, lee]
console.log(users.rejectBy('name', 'i', true)); // [hong, lee]
console.log(users.findBy('name', 'Kim')); //  kim;
console.log(users.sortBy('name:desc')); //  [lee, kim, hong];
console.log(users.sortBy('name')); // [hong, kim, lee]
console.log(users.groupBy(({ dept }) => dept));
/*
Server: [
  { id: 1, name: 'Hong', dept: 'Server' },
  { id: 2, name: 'Kim', dept: 'Server' },
],
Client: [
  { id: 3, name: 'Lee', dept: 'Client' }
],
*/

console.log('first/last=', users.firstObject.name, users.lastObject.name); // hong/lee
users.firstObject = kimx;
users.lastObject = hongx;
console.log('first/last=', users.firstObject.name, users.lastObject.name); // kim/hong


//as 도 활용 잘 하는 법