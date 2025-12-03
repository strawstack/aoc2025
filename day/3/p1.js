import { readFileSync } from 'fs';

function maxJoltage(str) {
    let best = 0;
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j < str.length; j++) {
            const num = parseInt(`${str[i]}${str[j]}`, 10);
            best = Math.max(best, num);
        }
    }
    return best;
}

function sol(input) {
    input = input.split("\n");
    let sum = 0;
    for (let row of input) {
        sum += maxJoltage(row);
    }
    return sum;
}

function main() {
    const input = readFileSync("input.txt", "utf-8").trim();
    const ans = sol(input);
    console.log(ans);
}

main();