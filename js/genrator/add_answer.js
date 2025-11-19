const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

function* add() {
    const x = yield "첫번째 수는 ? ";
    const y = yield "두번째 수는 ? ";
    return `Total : ${x + y}`;
}

const adder = add();

const rl = readline.createInterface({ input, output });

function run({ value, done }) {
    if (done) {
        console.log(`Total  : ${value}`);
        return rl.close()
    }
    rl.question(`${value} -> `, answer => {
        if (isNaN(answer)) {
            console.log('숫자를 입력하세요')
            run({ value, done }); //스킵 되면 안되니까 next 하지말고 
        } else {

            run(adder.next(+answer))
        }
    })
} //재귀.

run(adder.next()) //next의리턴값이머야
// rl.on('line', answer => {
//     const { value, done } = adder.next(Number(answer));
// })

rl.on('close', function () {
    process.exit();
});
