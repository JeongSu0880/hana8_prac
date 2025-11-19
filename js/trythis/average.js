const N = 100000;
function getAverage(a) {
    let sum = 0;
    let not_num = 0;
    for (const item of a) {
        if (typeof item !== 'number') {
            not_num++;
            continue;
        }
        sum += item * N * 100;

        console.log(Math.trunc(sum / (a.length - not_num) / N) / 100);
    }

}
const prices = [10.34232323, 15, 'xxx', 5.67899, null, 20.9, 1.005121, 0, 15.234, undefined, 0.5];


getAverage(prices)