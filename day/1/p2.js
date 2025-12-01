import { readFileSync } from 'fs';

function sol(input) {
    const data = input.split("\n").map(n => {
        return [n[0], parseInt(n.slice(1), 10)];
    });

    let times = 0;
    let current = 50;
    for (let [d, n] of data) {
        
        const dir = d === "L" ? -1 : 1;
        for (let i = 0; i < n; i++) {
            current += dir;
            
            if (current === 100) current = 0;
            if (current === -1) current = 99;

            if (current === 0) {
                times += 1;
            }
        }
    }

    return times;
}

function main() {
    const data = readFileSync("input.txt", "utf-8").trim();
    const ans = sol(data);
    console.log(ans);
}

main();