import { readFileSync } from 'fs';

const d = false;

// Returns an array of digits sorted from
// sorted by index position then highest to lowest 
function getSortedDigits(numStr) {
    const digits = [];
    for (let k = 9; k >= 0; k--) {
        const ks = k.toString();
        for (let i = 0; i < numStr.length; i++) {
            if (ks === numStr[i]) {
                digits.push({
                    value: ks,
                    index: i
                });
            }
        }
    }
    return digits;
}

// Pick the left-most twelve numbers from "digits" that are in order
// this will be the largest possible value
function best(digits, n, selection) {
    if (n === 0) return selection;
    let index = 0;
    while (index < digits.length) {
        if (selection.length > 0) {
            const prevIndex = selection[selection.length - 1].index;
            if (prevIndex < digits[index].index) {
                selection.push(digits[index]);
                if (d) console.log(`  push: ${digits[index].value}, index: ${digits[index].index}, s: ${selection.map(({value}) => value)}`);
                if (best(digits, n - 1, selection) !== false) return selection;
                selection.pop();
            }
        } else {
            selection.push(digits[index]);
            if (d) console.log(`  push: ${digits[index].value}, index: ${digits[index].index}, s: ${selection.map(({value}) => value).join("")}`);
            if (best(digits, n - 1, selection) !== false) return selection;
            selection.pop();
        }
        index += 1;
    }
    return false;
}

function maxJoltage(numStr) {
    if (d) console.log(`numStr: ${numStr}`);
    const digits = getSortedDigits(numStr);
    if (d) console.log(`digits: ${JSON.stringify(digits)}`);
    const bestArr = best(digits, 12, []);
    const value = parseInt(bestArr.map(({value}) => value).join(""), 10);
    if (d) console.log(`value: ${value}`);
    return value;
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
    //const input = readFileSync("test.txt", "utf-8").trim();
    const ans = sol(input);
    console.log(ans);
}

main();