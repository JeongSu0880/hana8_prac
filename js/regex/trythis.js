const assert = require('assert');

const upperToLower = str => str.replace(/[A-Z]g/, (...args) => console.log(args))

// assert.strictEqual(upperToLower('Senior Coding Learning JS'), '*s*-enior *c*-oding *l*-earning *j*-*s*-');

const swapCase = (str) => str.replace(/([A-Z])([a-z]*)/g, (m, up, low) => `${up.toLowerCase()}${low.toUpperCase()}`)

swapCase('abc Senior Coding Learning JS')

assert.equal(swapCase('Senior Coding Learning JS'), 'sENIOR cODING lEARNING js');
assert.equal(swapCase('Hanaro 8 Class'), 'hANARO 8 cLASS');


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
assert.deepStrictEqual(telfmt('0101234567'), '010-123-4567');
// assert.deepStrictEqual(telfmt('01012345678'), '010-1234-5678');
// assert.deepStrictEqual(telfmt('0212345678'), '02-1234-5678');
// assert.deepStrictEqual(telfmt('021234567'), '02-123-4567');
// assert.deepStrictEqual(telfmt('0331234567'), '033-123-4567');
// assert.deepStrictEqual(telfmt('15771577'), '1577-1577');
// assert.deepStrictEqual(telfmt('07012341234'), '070-1234-1234');
// assert.deepStrictEqual(telfmt('050712345678'), '0507-1234-5678');

const isEndJaum = str => {
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


assert.equal(isEndJaum('아지오'), false);
assert.equal(isEndJaum('북한강'), true);
assert.equal(isEndJaum('뷁'), true);
assert.equal(isEndJaum('강원도'), false);
assert.equal(isEndJaum('바라당'), true);
assert.equal(isEndJaum('ㅜㅜ'), false);
assert.equal(isEndJaum('케잌'), true);
assert.equal(isEndJaum('점수 A'), false);
assert.equal(isEndJaum('알파벳L'), true);
assert.equal(isEndJaum('24'), false);
assert.equal(isEndJaum('23'), true);

const josa = (str, ja_mo) => {
    const [ja, mo] = ja_mo.split('/')
    return `${isEndJaum(str) ? ja : mo}`;
}
const iga = str => josa(str, '이/가')
const eunun = str => josa(str, '은/는')
const eulul = str => josa(str, '을/를')
const eyuya = str => josa(str, '이어야/여야')

assert.equal(`고성군${iga('고성군')}`, '고성군이');
assert.equal(`고성군${eunun('고성군')}`, '고성군은');
assert.equal(`고성군${eulul('고성군')}`, '고성군을');
assert.equal(`성동구${iga('성동구')}`, '성동구가');
assert.equal(`성동구${eunun('성동구')}`, '성동구는');
assert.equal(`성동구${eulul('성동구')}`, '성동구를');
assert.equal(`고성군${eyuya('고성군')}`, '고성군이어야');
assert.equal(`성동구${eyuya('성동구')}`, '성동구여야');
