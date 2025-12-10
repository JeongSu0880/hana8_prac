
function registUserObj({ name, age }: { name: string; age: number }) {
    const id = 100;
    return { id, name, age };
}
// type RegistUserObj = Parameters<typeof registUserObj> extends (infer A)[]? A: Parameters<typeof registUserObj> 
type RegistUserObj = Parameters<typeof registUserObj>[number]

const paramObj: RegistUserObj = { name: 'Hong', age: 32 };
const newUser2 = registUserObj(paramObj);
console.log('🚀  newUser2:', newUser2);

type ComponentProps<F extends Function> = F extends (...args: infer ARGS) => void ? ARGS : never;