interface IUser {
    id: number;
    age: number;
    name: string;
}

interface IDept {
    id: number;
    age: string;
    dname: string;
    captain: string;
}

// type PartialRequired<T, U extends keyof T> = Required<Pick<T, U>> & Partial<Omit<T, U>>
// type PartialRequired<T, U extends keyof T> = Partial<T> & Required<Pick<T, U>>
type PartialRequired<T, U extends keyof T> = {
    [k in keyof T as k extends U ? never : k]?: T[k]
} & {
    [k in keyof T as k extends U ? k : never]-?: T[k]
}


// type OnlyKey<T> = keyof T
// const a :OnlyKey<IUser> = 'id'
// type PartialRequired<T, K extends keyof T> = Required<K> & Partial<T>

type C = Extract<IUser, 'kk'>
type D = keyof IUser | keyof IDept


// type E = Extract<keyof IUser, 'id'>


// & 연산을 둘 다 만족한다의 관점에서 바라보자!
type User
    = PartialRequired<IUser, 'name'>; // name만 required

// type CombineExclude<T, U, E extends keyof (T & U)> = {
//     [k in Exclude<keyof (T & U), E>]: k extends (keyof T & keyof U) ? T[k] | U[k] : (T & U)[k]
// }

type CombineExclude<T, U, E extends keyof (T & U)> = {
    [k in keyof (T & U) as k extends E ? never : k]: k extends (keyof T & keyof U) ? T[k] | U[k] : (T & U)[k]
}

type ICombineExclude
    = CombineExclude<IUser, IDept, 'name' | 'dname'>;
// type Combine<T, U> = {
//     [k in keyof (T & U)] : k extends (keyof T & keyof U) ? T[k] | U[k] : (T & U)[k]
// }

// type CombineExclude<T, U, E extends keyof (T & U)> = {
//   [K in Exclude<keyof (T & U), E>]:
//     K extends keyof T
//       ? (K extends keyof U ? T[K] | U[K] : T[K])
//       : (K extends keyof U ? U[K] : never)
// };

// type User = PartialRequired<IUser, 'name'>; // name만 required
type User2 = PartialRequired<IUser, 'addr'>; // Error(: addr is not exists)
let missName: User = {}; // Error! (: name is required)
let nameOnly: User = { name: 'Hong' }; // OK
let nameWithId: User = { name: 'Hong', id: 2 }; // OK
let nameWithExtra: User = { name: 'Hong', idd: 2 }; // Fail(idd is not exists)
console.log('🚀 ~', missName, nameOnly,
    nameWithId, nameWithExtra);
