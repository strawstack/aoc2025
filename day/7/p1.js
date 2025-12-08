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

function sol(input) {
    input = input.split("\n").map(row => row.split(""));
    const startPos = getStart(input);
    input[1][startPos.x] = "|";

    let total = 0;
    for (let y = 2; y < input.length; y++) {
        // print(input);
        for (let x = 0; x < input[y].length; x++) {
            const above = {x, y: y - 1};
            if (input[above.y][above.x] === "|") {
                if (input[y][x] === "^") {
                    total += 1;
                    if (bounds(input, {x: x - 1, y}) && input[y][x - 1] !== "^") {
                        input[y][x - 1] = "|";
                    }
                    if (bounds(input, {x: x + 1, y}) && input[y][x + 1] !== "^") {
                        input[y][x + 1] = "|";
                    }
                } else {
                    input[y][x] = "|";
                }
            }
        }
    }
    return total;
}

function main() {
    const input = readFileSync("input.txt", "utf-8").trim();
    // const input = readFileSync("test.txt", "utf-8").trim();
    const ans = sol(input);
    console.log(ans);
}

main();