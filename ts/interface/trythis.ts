
// type Ud2 = (TUser | TDept) & { addr: string }; => 이걸 인터페이스로 정의해봐!

interface User {
    id: number;
    name: string;
}

interface Dept {
    id: number;
    dname: string;
    captain: string;
}

interface Ud2 {
    [x: string]: number | string;
    addr: string;
}

// 다음 코드가 오류가 없으면 통과!
const ud2: Ud2 = { id: 1, name: 'HH', addr: 'Seoul' };
const ud3: Ud2 = { id: 1, dname: 'HH', captain: 'HH', addr: 'Seoul' };