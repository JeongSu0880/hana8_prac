function whereToPoint(a, b) {
    let i = 0;

    // if (num === undefined || num === null) return 0;//꼭 타입 검사!
    if (!a || !b) return 0;

    while (a > Number.EPSILON || b > Number.EPSILON) {

        console.log(a, b)
        a = a * 10 - Math.floor(a * 10);
        b = b * 10 - Math.floor(b * 10);

        if (a / (10 ** i) < Number.EPSILON && b / (10 ** i) < Number.EPSILON) {
            console.log(a, b)
            console.log(10 ** i);
            break;

        }
        // console.log(a, b);
        i++;
    }
    return i;
}

function addPoints(a, b) {
    let pointCnt = whereToPoint(a, b)
    console.log("🚀 ~ addPoints:", pointCnt)

    let result = (a + b).toFixed(pointCnt)
    console.log("🚀result:", result)
}

// addPoints(0.21354, 0.1)   // 0.31354
// addPoints(0.14, 0.28)     // 0.42
// addPoints(0.34, 0.226)    // 0.566
addPoints(10.34, 200.226) // 210.566
// addPoints(0.143, -10.28)  // -10.137
// addPoints(0.143, -10) 


//0.0을 그냥 정수 0으로 보는 오류가 있다. 그래서 스트링으로 바꾸고 또 바꾸는 방법을 사용하는 것이 좋다.