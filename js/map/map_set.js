const hong = { id: 1, name: 'Hong' };
const map = new Map([[1, 11], [2, 22]]);
map.set('three', 333);         // { three: 333 }
map.set('four', [1, 2, 3, 4]); // { four: [1,2, 3, 4] }
map.set(hong.name, hong);
map.set(hong, hong.name);
console.log(map);  // Map(6) {  1 => 11, 2 => 22, 'three' => 333, 'four' => [ 1, 2, 3, 4 ],    ?, ?}
console.log("before change : ", map.get(hong))
// hong = null
console.log("after change : ", map.get(hong))
//스택은 immutable 하기 때문에 hong = null로 새로 스택에 추가됨. 그런데..!
console.log("그런데 맵은 >> ", map)
// 과거의 홍 쓰레기 값이 출력되는 것. 왜냐면 맵이 해당 주소를 계속 보고 있어서 GC가 메모리를 수거하지 못함.




console.log(map.get(hong));  // 'Hong'
map.delete(hong);   // console.log(hong?.name); // ?  ⇒ hong = null; console.log(map); // ?
console.log('hasHong=', map.has(hong));          // ?
console.log('hasHongName=', map.has(hong?.name)); // ?
map.clear();

map.set(1, 11).set(2, 22).set(3, 33);    // ⇐⇒ new Map([[1, 11], [2, 22], [3, 33]); 
map.entries(); map.keys(); map.values(); // { [ 1, 11 ], [ 2, 22 ], … };  { 1, 2, … };  { 11, 22, … }
const map2 = new Map([...map])           // Map(2) { 1 => 11, 2 => 22, 3 => 33 }
const map3 = new Map([...map, ...map2])  // Map(2) { 1 => 11, 2 => 22, 3 => 33 }

console.log("------------------------------")
let kim = { id: 2, name: 'Kim' }
const wmap = new WeakMap();
wmap.set(new Number(1), 11);
wmap.set(kim, kim.name)

//에러! weakmap의 키는 primitive 타입은 안됨. z오브젝트만 됨. 왜냐면 주소가 들어가야하거든.그래서 객체화 필요
console.log("🚀 ~ wmap:", wmap)
console.log("🚀 ~ wmap:", wmap.has(1)) //false
console.log("🚀 ~ wmap:", wmap.has(kim)) //true

kim = null
console.log("🚀 ~ wmap:", wmap.has(kim)) //false


