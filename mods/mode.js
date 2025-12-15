// const assert = require('assert') // commonJS 방식
// import assert from 'assert' //ESM 
export { isEndJaum } from './hangul.js';
export * from './hangul.js'

// import * from 'react'
//실제로는 파일이 다 쪼개져있는데 react라는 이름으로 import 받는다? -> aggregator

export default './hangul.js'