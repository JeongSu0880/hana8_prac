const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

// rl.question('What do you think of Node.js? ', (answer) => {
//     console.log(`Thank you for your valuable feedback: ${answer}`);

//     rl.close();
// });

rl.on('close', function () {
    process.exit();
});

function* add() {
    let x
    yield rl.question('첫번째 수 ? -> ', (answer) => {
        console.log(answer)
        x = answer;
        rl.close();
    });  // next()로 받는 값

    const y = yield "두 번째 수?";
    return `Total: ${x + y}`;
}

const itAdd = add();

console.log(itAdd.next().value);   // → "첫 번째 수?"
console.log(itAdd.next(1).value);  // → "두 번째 수?"
console.log(itAdd.next(2).value);  // → "Total: 3"