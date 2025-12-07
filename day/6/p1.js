import { readFileSync } from 'fs';

function sol(input) {

    function column(numbers, index) {
        const col = [];
        for (let row of numbers) {
            col.push(row[index]);
        }
        return col;
    }

    function evaluate(func, arr) {
        return arr.reduce((a, c) => {
            if (a === null) return c;
            return func(a, c);
        }, null);
    }

    const {numbers, finalRow} = (() => {
        const data = input.split("\n").map(row => row.split(/ +/));
        const finalRow = data[data.length - 1];
        const numbers = data.slice(0, data.length - 1).map(row => {
            return row.map(n => parseInt(n, 10));
        });
        return {numbers, finalRow};
    })();

    const func_lookup = {
        "*": (a, b) => {
            return a * b;
        },
        "+": (a, b) => {
            return a + b;
        }
    };

    let total = 0;
    for (let i = 0; i < finalRow.length; i++) {
        const func = func_lookup[finalRow[i]];
        const col = column(numbers, i);
        total += evaluate(func, col);
    }

    return total;
}

function main() {
    const input = readFileSync("input.txt", "utf-8").trim();
    const ans = sol(input);
    console.log(ans);
}

main();