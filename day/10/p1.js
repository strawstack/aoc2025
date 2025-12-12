import { readFileSync } from 'fs';

const d = false;

function getState(i, pad) {
    return i.toString(2).padStart(pad, "0").split("").map(e => (e === "0") ? false : true);
}

function applyState(state, btns) {
    const result = Array(state.length).fill(0);
    for (let i = 0; i < btns.length; i++) {
        if (!state[i]) continue;
        for (let n of btns[i]) {
            result[n] += 1;
        }
    }
    return result.map(n => (n % 2 === 0) ? false : true);
}

function eq(lights, result) {
    if (lights.length !== result.length) throw new Error("Should always be same length");
    for (let i = 0; i < lights.length; i++) {
        if (lights[i] !== result[i]) return false;
    }
    return true;
}

function sol(input) {
    input = input.split("\n").map(row => {
        row = row.split(" ");
        const lights = row.shift();
        const joltage = row.pop().split(",").map(n => parseInt(n, 10));
        const btns = row.map((btn) => {
            return btn.slice(1, btn.length - 1).split(",").map(n => parseInt(n, 10));
        });
        return {
            lights: lights.slice(1, lights.length - 1).split("").map(e => (e === ".") ? false : true),
            joltage: joltage.slice(1, joltage.length - 1), 
            btns
        };
    });

    let total = 0;
    for (let { lights, btns } of input) {
        if (d) console.log(`lights: ${JSON.stringify(lights)}`);

        const maxNumber = Math.pow(3, lights.length) - 1;
        let best = Infinity;
        for (let i = 0; i <= maxNumber; i++) {
            const state = getState(i, lights.length);
            if (d) console.log(`state: ${JSON.stringify(state)}`);
            const result = applyState(state, btns);
            if (d) console.log(`result: ${JSON.stringify(result)}`);
            if (d) console.log("");
            if (eq(lights, result)) {
                best = Math.min(best, state.reduce((a, c) => a + (c ? 1 : 0), 0));
            }
        }
        if (best === Infinity) throw new Error("All must have a solution");
        total += best;
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