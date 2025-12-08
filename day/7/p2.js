import { readFileSync } from 'fs';

function getStart(input) {
    return {
        x: input[0].findIndex(e => e === "S"),
        y: 0
    };
}

function bounds(input, {x, y}) {
    const width = input[0].length;
    const height = input.length;
    return x >= 0 && x < width && y >= 0 && y < height;
}

function print(input) {
    for (let row of input) {
        console.log(row.join(""));
    }
    console.log("");
}

function down(pos) {
    return {
        x: pos.x,
        y: pos.y + 1
    };
}

function split(below) {
    return [
        {
            x: below.x - 1,
            y: below.y,
        },
        {
            x: below.x + 1,
            y: below.y,
        }
    ];
}

function hash(pos) {
    return JSON.stringify(pos);
}

const lookup = {};
function travel(input, startPos) {

    const h = hash(startPos);
    if (h in lookup) return lookup[h];

    const below = down(startPos);

    // Path complete
    if (below.y >= input.length) {
        return 1;
    }

    if (input[below.y][below.x] === ".") {
        const res = travel(input, below);
        lookup[h] = res;
        return res;

    } else { // ^
        const [left, right] = split(below);
        const res = travel(input, left) + travel(input, right);
        lookup[h] = res;
        return res;
    }

}

function sol(input) {
    input = input.split("\n").map(row => row.split(""));
    const startPos = getStart(input);
    return travel(input, startPos);
}

function main() {
    const input = readFileSync("input.txt", "utf-8").trim();
    //const input = readFileSync("test.txt", "utf-8").trim();
    const ans = sol(input);
    console.log(ans);
}

main();