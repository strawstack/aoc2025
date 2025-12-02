import { readFileSync } from 'fs';

function sol(input) {
    return input;
}

function main() {
    const input = readFileSync("input.txt", "utf-8").trim();
    const ans = sol(input);
    console.log(ans);
}

main();