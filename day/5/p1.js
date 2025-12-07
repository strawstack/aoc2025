import { readFileSync } from 'fs';

function isFresh(freshRanges, id) {
    let fresh = 0;
    let inRange = false;
    for (let {value, state} of freshRanges) {

        // Track if given "id" is in the current range
        if (inRange) {
            if (id <= value) {
                return fresh > 0; // If 
            }
        } else {
            if (value <= id) {
                inRange = true;
                if (value === id) return true;
            }
        }

        // Update number of fresh intervals currently active
        if (state) {
            fresh += 1;
        } else {
            fresh -= 1;
        }
    }
}

function sol(input) {
    let [freshRanges, ids] = input.split("\n\n");
    freshRanges = freshRanges.split("\n").map(r => r.split("-").map(x => parseInt(x, 10)));
    freshRanges = freshRanges.map(([lo, hi]) => {
        return [{value: lo, state: true}, {value: hi, state: false}];
    }).flat();
    freshRanges = freshRanges.sort((a, b) => a.value - b.value);
    ids = ids.split("\n").map(n => parseInt(n, 10));

    let total = 0;
    for (let id of ids) {
        const fresh = isFresh(freshRanges, id);
        if (fresh) total += 1;
    }

    return total;
}

function main() {
    const input = readFileSync("input.txt", "utf-8").trim();
    const ans = sol(input);
    console.log(ans);
}

main();