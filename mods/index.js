import * from './mode.js'
console.log(X)

console.log("HElllllllo world!")

// const add = (...args) => { }

// assert.strictEqual(add(1, 2), 3)
// assert.strictEqual(add(1, 2, 3), 6)

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

//export된 것들은 readonly!