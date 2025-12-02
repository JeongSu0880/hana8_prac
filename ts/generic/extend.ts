//객체 타입 extends
interface IUser {
    id: number;
    age: string;
    dname: string;
}
interface IDept {
    id: number;
    age: string;
    dname: string;
    captain: string;
}
type BN<T, U> = T extends U ? true : false;
type IdBN1 = BN<IUser, IDept>;    //false
type IdBN2 = BN<IDept, IUser>;   //true

//유니온 타입 extends
type TEST<T, U> = T extends U ? "1" : "0";
type ya = TEST<'id', 'id' | 'age' | 'dname'>  // "1"
type ya1 = TEST<'id' | 'age' | 'dname', 'id'>  // "1" | "0" (실제로는 "1" | "0" | "0")

