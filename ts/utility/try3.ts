
const debounce = () => {
    let timer;
    return () => {
        if (timer) 
    }
}

const throttle = function <T>(cb: CB<T>, delay?: number) {
    let timer: ReturnType<typeof setTimeout>
    return (...args: T[]) => {
        if (timer) return;
        timer = setTimeout(() => {
            cb(...args);
            timer = null;
        }, delay);
    };
}

// test
const debo = debounce((a: number, b: string) => console.log(a + 1, b), 1000);
for (let i = 10; i < 15; i++) debo(i, 'abc');   // 15, 'abc'

const thro = throttle((a: number) => console.log(a + 1), 1000);
for (let i = 10; i < 15; i++) thro(i);   // 11


