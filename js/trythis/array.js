const arr = [[{ id: 1 }], [{ id: 2 }, { id: 3 }]];


// const [arr1, arr2] = arr;
// const [obj1, obj2] = arr2;

// const { id: id1 } = arr1[0];
// const { id: id2 } = obj1;
// const { id: id3 } = obj2;

const [[{ id: id1 }], [{ id: id2 }, { id: id3 }]] = arr;
//그냥 개뻘짓했다. ,,흐흐,,

// console.log("🚀 ~ arr2:", arr2)

console.log(id1, id2, id3);

const ar = [1, 2];

[ar[0], ar[1]] = [ar[1], ar[0]];
console.log(ar)