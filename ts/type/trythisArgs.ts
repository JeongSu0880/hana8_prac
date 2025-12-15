
function add(a: number, b: string, c: boolean) {
    return `${a} - ${b} + ${c}`;
}

// function add(a: number) { 
//   return `${a}`;
// }

// type FirstArgs<F extends Function> = F extends (first: infer A, ...rest: unknown[]) => unknown ? A : void; //왜 안됨?? 
type FirstArgs<F extends Function> = F extends (first: infer A, ...rest: infer L) => unknown ? A : void;// infer로 했을 때도 되고 (불필요한 변수 선언)
// type FirstArgs<F extends Function> = F extends (first: infer A, ...rest: any) => unknown ? A : void; // any도 되는데
//-> rest가 기대하는 것을 튜플 타입이라 안된다?
//엥 unknown에는 never도 포함인데?
// type FirstArgs<F extends Function> = F extends (first: infer A, ...rest: unknown[]) => unknown ? A : unknown;
type SecondArgs<F extends Function> = F extends (first: infer A, second: infer B, ...rest: unknown[]) => infer R ? B : unknown
// type SecondArgs<F extends Function> = F extends (first: infer A, second: infer B, ...rest: infer L) => infer R ? B : unknown
type Args<F extends Function> = F extends (...args: infer L) => infer R ? L[number] : unknown


// type SecondArgs<F> = infer F
// type Args<F> = infer F

type A = FirstArgs<typeof add>;  // number
type B = SecondArgs<typeof add>; // string
type C = Args<typeof add>;
//number | string | boolean

type AX = Args<typeof String.prototype.endsWith>;  // ⇒ string | number | undefined
type AX2 = Args<typeof String.prototype.charAt>;   // ⇒ number
