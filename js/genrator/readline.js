const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });


function* add() {
    const x = yield "첫번째 숫자?";
    const y = yield "두번째 숫자?";
    yield x + y;
    return `Total :  ${x + y}`;
}

rl.question('What do you think of Node.js? ', (answer) => {
    console.log(`Thank you for your valuable feedback: ${answer}`);

    rl.close();
});

rl.on('close', function () {
    process.exit();
});
rl.on('line', answer => {
    console.log('line.answer>>', answer);
    if (answer === 'bye') rl.close();
}).on('close', () => {
    process.exit();
});
//이게 빌더패턴
