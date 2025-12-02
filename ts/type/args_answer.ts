
function add(a: number, b: string, c: boolean) {
    return `${a} - ${b} + ${c}`;
}

type FirstArgs<F extends Function> = F extends (...args: infer ARGS) => void ? ARGS[0] : void;
type SecondArgs<F extends Function> = F extends (...args: infer ARGS) => void ? ARGS[1] : void;
type Args<F extends Function> = F extends (...args: infer ARGS) => void ? ARGS[number] : void;

//javascript에서는 f() 일때도 첫번째 아규먼트가 arguments[0]이기에 undefined이다. (없지 않다는 뜻) 
//F extends를 걸어줄 때와 안 걸어줄 때 -> 위의 경우에 무조건 함수이면 undefined라도 반환해서 결과적으로 동작에 문제가 없는데, 만약에 함수 자체가 아니라면 문제 발생할 수 있다.
//무슨 문제가??? 


//나 전에 문제 -> 함수의 매개변수는 반공변성!!! -> 그래서 문제가 생겼던거임. 맞든지 작아져야함. unknown은 너무 넓기 때문에 안되는 것.

// type SecondArgs<F> = infer F
// type Args<F> = infer F

type A = FirstArgs<typeof add>;  // number
type B = SecondArgs<typeof add>; // string
type C = Args<typeof add>;
//number | string | boolean

type AX = Args<typeof String.prototype.endsWith>;  // ⇒ string | number | undefined
type AX2 = Args<typeof String.prototype.charAt>;   // ⇒ number
