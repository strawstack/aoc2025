import { readFileSync } from 'fs';

function sol(input) {
    const data = input.split("\n").map(n => {
        return [n[0], parseInt(n.slice(1), 10)];
    });
    
    let times = 0;
    let current = 50;
    for (let [d, n] of data) {
        
        // console.log(d, n);

        const sign = d === "L" ? -1 : 1;
        current += (sign * n);

        current = current % 100;
        while (current < 0) current += 100; // Make sure not negative

        // console.log(current);

        if (current === 0) {
            times += 1;
        }
    }

    return times;
}

function main() {
    const data = readFileSync("input.txt", "utf-8").trim();
    // const data = readFileSync("test.txt", "utf-8").trim();
    const ans = sol(data);
    console.log(ans);
}

main();