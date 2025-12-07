import { readFileSync } from 'fs';

const d = false;

function sol(input) {

    function column(numbers, offsets, i) {
        
        const start = offsets[i];
        const end =  (i + 1 < offsets.length) ? offsets[i + 1] - 1 : numbers[0].length;
        
        if (d) console.log(`start: ${start}, end: ${end}`);

        const col = [];
        for (let i = start; i < end; i++) col.push([]);

        for (let row of numbers) {

            if (d) console.log(`row: ${row}`);

            for (let i = start; i < end; i++) {
                let index = i - start;
                col[index].push(row[i]);
            }

        }
        const extract = col.map(e => parseInt(e.join("").trim(), 10)).reverse();
        if (d) console.log(`extract: ${extract}`);

        return extract;
    }

    function evaluate(func, arr) {
        return arr.reduce((a, c) => {
            if (a === null) return c;
            return func(a, c);
        }, null);
    }

    const {numbers, finalRow, offsets} = (() => {
        const data = input.split("\n");

        const finalRowStr = data[data.length - 1];
        const offsets = [];
        for (let i = 0; i < finalRowStr.length; i++) {
            if (finalRowStr[i] !== " ") {
                offsets.push(i);
            }
        }

        const finalRow = data[data.length - 1].split(/ +/);
        const numbers = data.slice(0, data.length - 1);

        return {numbers, finalRow, offsets};
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
        const col = column(numbers, offsets, i);
        const value = evaluate(func, col);
        if (d) console.log(value);
        total += value;
    }

    return total;
}

function main() {
    const input = readFileSync("input.txt", "utf-8").trim();
    //const input = readFileSync("test.txt", "utf-8").trim();
    const ans = sol(input);
    console.log(ans);
}

main();