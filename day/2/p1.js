import { readFileSync } from 'fs';

function hasDoubles(numStr) {
    if (numStr.length % 2 === 1) return false;
    const mi = numStr.length / 2;
    return numStr.slice(0, mi) === numStr.slice(mi);
}

function sol(input) {
    input = input.split(",").map(x => x.split("-"));

    let count = 0;
    for (let [lo, hi] of input) {
        for (let n = parseInt(lo, 10); n <= parseInt(hi, 10); n++) {
            const numStr = n.toString();
            count += hasDoubles(numStr) ? n : 0;
        }
    }

    return count;
}

function main() {
    const input = readFileSync("input.txt", "utf-8").trim();
    const ans = sol(input);
    console.log(ans);
}

main();