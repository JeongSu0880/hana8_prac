interface CallSignature {
    (input: string): number;  // call signa..
    count: 0; // cf. count: number
    greeting: (name: string) => void;
}

type X = {
    [k in keyof CallSignature]: CallSignature[k]
}

const typedCallSignature: CallSignature =
    (input) => input.length;

console.log(typedCallSignature)

typedCallSignature.count = 0;
typedCallSignature.greeting = (name) =>
    console.log(`Hi, ${name}`);