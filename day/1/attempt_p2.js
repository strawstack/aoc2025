// Attempt at doing the math to be more efficient

import { readFileSync } from 'fs';

function sol(input) {
    const data = input.split("\n").map(n => {
        return [n[0], parseInt(n.slice(1), 10)];
    });

    let times = 0;
    let current = 50;
    for (let [d, n] of data) {

        // Assert
        if (n === 0) throw new Error("Expect turn number to be greater than zero");

        // distance: from current number to zero
        // sign: direction of travel
        let distance = null; 
        let sign = null;
        if (d === "L") {
            distance = current;
            sign = -1;

        } else {
            distance = 100 - current;
            sign = 1;
        }
        
        // Will the turn make it to zero
        if (distance <= n) {
            times += 1;
        }

        // After getting to zero, how many loops occur
        const rem = n - distance;
        if (rem > 0) {
            times += Math.floor(rem / 100);
        }

        // Calculate the next location
        current += (sign * n);
        current = current % 100;
        while (current < 0) current += 100; // Make sure not negative
    }

    return times;
}

function main() {
    const data = readFileSync("input.txt", "utf-8").trim();
    const ans = sol(data);
    console.log(ans);
}

main();