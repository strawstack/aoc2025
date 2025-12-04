import { readFileSync } from 'fs';

function bounds(width, height, pos) {
    return pos.x >= 0 && pos.x < width && pos.y >= 0 && pos.y < height;
}

function hash(pos) {
    return JSON.stringify(pos);
}

function print(grid, coords) {
    const height = grid.length;
    const width  = grid[0].length;
    for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < width; x++) {
            if (hash({x, y}) in coords) {
                row.push("x");
            } else {
                row.push(grid[y][x]);
            }
        }
        console.log(row.join(""));
    }
}

function modifyGrid(grid, coords) {
    for (let {x, y} of Object.values(coords)) {
        grid[y][x] = ".";
    }
}

function rollsToRemove(grid) {
    
    const height = grid.length;
    const width  = grid[0].length;

    const adj = [
        {x: -1, y: -1},
        {x: 0, y: -1},
        {x: 1, y: -1},

        {x: -1, y: 0},
        {x: 1, y: 0},

        {x: -1, y: 1},
        {x: 0, y: 1},
        {x: 1, y: 1},
    ];

    let total = 0;
    const coords = {};
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] !== "@") continue;
            let count = 0;
            for (let {x: ax, y: ay} of adj) {
                const pos = {
                    x: x + ax,
                    y: y + ay
                };
                if (bounds(width, height, pos)) {
                    if (grid[pos.y][pos.x] === "@") {
                        count += 1;
                    }
                }
            }
            if (count < 4) {
                coords[hash({x, y})] = {x, y};
                total += 1;
            };
        }
    }
    //print(grid, coords);
    modifyGrid(grid, coords);
    return total;
}

function sol(input) {
    const grid = input.split("\n").map(row => row.split(""));
    let total = 0;
    while (true) {
        const rolls = rollsToRemove(grid);
        total += rolls;
        if (rolls === 0) break;
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