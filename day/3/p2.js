import { readFileSync } from 'fs';

const seen = {};

function count(mask) {
    let total = 0;
    for (let value of mask) {
        if (value) total += 1;
    }
    return total;
}

function evaluate(arr, mask) {

    let total = 0;
    for (let value of mask) {
        if (value) total += 1;
    }

    if (total !== 12) return 0;

    return parseInt(
        arr.filter((_, i) => i < mask.length && mask[i]).join("")
    , 10);
}

function hash(mask) {
    return mask.map(v => v ? "1": "0").join("");
}

function maxJoltage(arr, mask) {
    console.log(mask)
    if (mask.length > arr.length) return 0;
    if (count(mask) > 12) return 0;

    const h = hash(mask);
    if (h in seen) return seen[h];

    const value = evaluate(arr, mask);
    const t = maxJoltage(arr, [...mask, true]);
    const f = maxJoltage(arr, [...mask, false]);

    const m = Math.max(value, t, f);
    seen[h] = m;
    return m;
}

function sol(input) {
    input = input.split("\n");
    let sum = 0;
    for (let row of input) {
        sum += maxJoltage(row.split(""), []);
    }
    return sum;
}

function main() {
    const input = readFileSync("input.txt", "utf-8").trim();
    const ans = sol(input);
    console.log(ans);
}

main();