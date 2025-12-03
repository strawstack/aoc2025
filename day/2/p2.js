import { readFileSync } from 'fs';

function isInvalid(numStr) {
    for (let k = 0; k <= Math.floor(numStr.length/2); k++) {
        if (numStr.length % k !== 0) continue;

        let flag = true;
        for (let i = 0; i < numStr.length; i++) {
            const j = i % k;
            if (numStr[i] !== numStr[j]) {
                flag = false;
            }
        }
        if (flag) return true;
    }
    return false;
}

function sol(input) {
    input = input.split(",").map(x => x.split("-"));

    let count = 0;
    for (let [lo, hi] of input) {
        for (let n = parseInt(lo, 10); n <= parseInt(hi, 10); n++) {
            const numStr = n.toString();
            count += isInvalid(numStr) ? n : 0;
        }
    }

    return count;
}

function main() {
    const input = readFileSync("input.txt", "utf-8").trim();
    //const input = readFileSync("test.txt", "utf-8").trim();
    const ans = sol(input);
    console.log(ans);
}

main();