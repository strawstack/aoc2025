import { readFileSync } from 'fs';

function sol(input) {
    let [freshRanges, ids] = input.split("\n\n");
    freshRanges = freshRanges.split("\n").map(r => r.split("-").map(x => parseInt(x, 10)));
    freshRanges = freshRanges.map(([lo, hi]) => {
        return [{value: lo, state: true}, {value: hi, state: false}];
    }).flat();
    freshRanges = freshRanges.sort((a, b) => {
        if (a.value === b.value) { // If values are the same sort open ahead of close
            const at = a.state ? 0 : 1;
            const bt = b.state ? 0 : 1;
            return at - bt;
        } else {
            return a.value - b.value;
        }
    });
    ids = ids.split("\n").map(n => parseInt(n, 10));

    let total = 0;
    let fresh = 0;
    let start = null;
    for (let {value, state} of freshRanges) {
        if (state) {
            fresh += 1;
            if (fresh === 1) {
                start = value;
            }
        } else {
            fresh -= 1;
            if (fresh === 0) {
                if (start === null) throw new Error("Start was 'null");
                total += value - start + 1;
                start = null;
            }
        }
    }

    return total;
}

function main() {
    const input = readFileSync("input.txt", "utf-8").trim();
    const ans = sol(input);
    console.log(ans);
}

main();