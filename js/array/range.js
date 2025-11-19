const range = (s, e, step) => {

    if (e === undefined) {
        let startSign = Math.sign(s)
        if (startSign !== 1) e = Math.sign(s);
        else {
            e = s;
            s = startSign;
        }
    }

    if (step === undefined) {
        step = Math.sign(e - s)
    }

    const newArr = [];

    if (step === 0 || s === e) {
        newArr.push(s)
        return newArr
    }

    if ((Math.sign(e - s) !== Math.sign(step))) {
        return newArr;
    }

    if (Math.sign(step) === 1) {
        for (let v = s; v <= e; v += step) {
            newArr.push(v);
        }
    } else {
        for (let v = s; v >= e; v += step) {
            newArr.push(v);
        }
    }

    //이렇게 for문이 갈리는 경우에는 그냥 while이 낫다.
    return newArr;
}

//개선점
//  리턴할 수 있으면 그냥 제일 위에서 빠르게 리턴하자.


console.log(range(1, 10, 1))  // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
console.log(range(1, 10, 2))  // [1, 3, 5, 7, 9]
console.log(range(1, 10))     // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
console.log(range(10, 1))     // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
console.log(range(10, 1, -2)); // [10, 8, 6, 4, 2]
console.log(range(5));         // [1, 2, 3, 4, 5] 
console.log(range(100));       // [1, 2, 3, 4, 5, …, 99, 100] 
console.log(range(-5))        // [-5, -4, -3, -2, -1]
console.log(range(5, 5));      // [5]                  
console.log(range(5, 5, 0));   // [5]                  
console.log(range(5, 5, -1));  // [5]                  
console.log(range(5, 1, 1));   // []                   
console.log(range(1, 5, -1));  // []                   
console.log(range(1, 5, 6));   // [1]                  
console.log(range(0));         // [0]           
console.log(range(2, 1, -5))  // [2]    
console.log(range(1, 5, 0)) // [1]
console.log(range(0, 5)); // [0, 1, 2, 3, 4, 5]
console.log(range(0, -1));  // [0, -1]
console.log(range(0, -3));  // [0, -1, -2, -3]
console.log(range(0, -3));  // [0, -1, -2, -3]
console.log(range(-3, 0));  // [-3, -2, -1, 0]
console.log(range(0, 0));  // [0]
console.log(range(0, 0, 5));   // [0]
console.log(range(0, -1, -5));  // [0]

// range(1, 10, 1);  // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
// range(1, 10, 2);  // [1, 3, 5, 7, 9]
// range(1, 10);     // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
// range(10, 1);     // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// range(10, 1, -2); // [10, 8, 6, 4, 2]
// range(5);         // [1, 2, 3, 4, 5] 
// range(100);       // [1, 2, 3, 4, 5, …, 99, 100] 
// range(-5);        // [-5, -4, -3, -2, -1]
// range(5, 5);      // [5]                  
// range(5, 5, 0);   // [5]                  
// range(5, 5, -1);  // [5]                  
// range(5, 1, 1);   // []                   
// range(1, 5, -1);  // []                   
// range(1, 5, 6);   // [1]                  
// range(0);         // [0]           
// range(2, 1, -5);  // [2]    
// range(1, 5, 0); // [1]
// range(0, 5); // [0, 1, 2, 3, 4, 5]
// range(0, -1);  // [0, -1]
// range(0, -3);  // [0, -1, -2, -3]
// range(0, -3);  // [0, -1, -2, -3]
// range(-3, 0);  // [-3, -2, -1, 0]
// range(0, 0);  // [0]
// range(0, 0, 5);   // [0]
// range(0, -1, -5);  // [0]    