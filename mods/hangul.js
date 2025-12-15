const s = ['강원도 고성군', '고성군 토성면', '토성면 북면', '북면', '김1수', '하남시', '홍길동']

const upperToLower = str => str.replace(/[A-Z]g/, (...args) => console.log(args))

// assert.strictEqual(upperToLower('Senior Coding Learning JS'), '*s*-enior *c*-oding *l*-earning *j*-*s*-');

const swapCase = (str) => str.replace(/([A-Z])([a-z]*)/g, (m, up, low) => `${up.toLowerCase()}${low.toUpperCase()}`)

swapCase('abc Senior Coding Learning JS')


// const telfmt = tel => {
//     const len = tel?.length;
//     if (!len || len < 5) return tel;

//     if (len <= 8) return `${tel.substring(0, len - 4)}-${tel.substring(len - 4)}`;

//     const n = tel.startsWith('02') ? 2 : 3;
//     const regex = new RegExp(`(\\d{${n}})(\\d{3,4})(\\d{4})`);
//     return tel.replace(regex, '$1-$2-$3');
// };

const telfmt = tel => {
    const len = tel?.length
    if (!len || len < 5) return tel

    const n = tel.startsWith('02') ? 2 : 3;
    const regex = new RegExp(`(\\d{${n}})(\\d{3,4})(\\d{4})`)
    const ret = tel.replace(regex, '$1-$2-$3')
    return ret
}
var X = 999;
export default X

export const isEndJaum = str => {
    const lastChar = str.at(-1)

    // if (alphaNums.includes(lastChar)) return true
    if (/[lmnr136780]/i.test(lastChar)) return true;

    const lastCharCode = lastChar.charCodeAt();
    const 가 = '가'.charCodeAt();
    const 힣 = '힣'.charCodeAt();

    if ((lastCharCode >= 가 && lastCharCode <= 힣 && (lastCharCode - 가) % 28 !== 0)) return true
    const ㄱ = 'ㄱ'.charCodeAt();
    const ㅎ = 'ㅎ'.charCodeAt();
    if (lastCharCode > ㄱ && lastCharCode < ㅎ) return true;

    return false
}
//백엔드 코드에서는 매번 charCodeAt()을 쓰는게 비용이 많이 드니까 그냥 code 자체를 넣어주느 ㄴ것이 좋다.



const josa = (str, ja_mo) => {
    const [ja, mo] = ja_mo.split('/')
    return `${isEndJaum(str) ? ja : mo}`;
}
const iga = str => josa(str, '이/가')
const eunun = str => josa(str, '은/는')
const eulul = str => josa(str, '을/를')
const eyuya = str => josa(str, '이어야/여야')



const searchByKoreanInitialSound = (data, first) => {
    //idea !
    // ㄱ  : ㄱ -깋
    // ㄴ : ㄴ - 닣
    // ㄱㄴ => [ㄱ가-깋][ㄴ나-닣]

    const ㄱㄴㄷ = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ';
    const 가나다 = '가나다라마바사아자차카타파하';

    const reg = [...first].reduce((acc, c) => {
        const idx = ㄱㄴㄷ.indexOf(c);
        const S = 가나다[idx]
        const 힣next = '힣'.charCodeAt(0) + 1;
        const eCode = (가나다[idx + 1]?.charCodeAt() ?? 힣next) - 1
        // const eCode = c === 'ㅎ' ? 가나다[가나다.length - 1].charCodeAt(0) : 가나다[idx + 1].charCodeAt(0) - 1;

        return `${acc}[${c}${S}-${String.fromCharCode(eCode)}]`;
    }, (''))
    const regex = new RegExp(reg);
    return data.filter(item => regex.test(item));
}
//끝지점에 대한 테스트 코드를 항상 넣어라
