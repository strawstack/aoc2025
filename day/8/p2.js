import { readFileSync } from 'fs';

function equal(b1, b2) {
    return b1[0] === b2[0] && b1[1] === b2[1] && b1[2] === b2[2];
}

function getDistance(a, b) {
    const s1 = a[0] - b[0];
    const s2 = a[1] - b[1];
    const s3 = a[2] - b[2];
    const p1 = Math.pow(s1, 2);
    const p2 = Math.pow(s2, 2);
    const p3 = Math.pow(s3, 2);
    const ans = Math.sqrt(p1 + p2 +p3);
    return ans;
}

function hash(box) {
    return JSON.stringify(box);
}

function find(groups, a) {
    let group = groups[a];
    while (groups[group] !== group) {
        group = groups[group];
    }
    groups[a] = group;
    return group;
}

function union(groups, a, b) {
    const ga = find(groups, a);
    const gb = find(groups, b);
    groups[gb] = ga;
}

function isOneGroup(input, groups) {
    const count = {};
    for (let box of input) {
        const group = find(groups, hash(box));
        if (!(group in count)) count[group] = 0; 
        count[group] += 1;
    }
    return Object.keys(count).length === 1;
}

function sol(input) {

    getDistance(
        [162,817,812],
        [425,690,689]
    );

    getDistance(
        [57,618,57],
        [52,470,668]
    );

    input = input.split("\n").map(row => row.split(",").map(n => parseInt(n, 10)));
    let pairs = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            const dist = getDistance(input[i], input[j]);
            pairs.push({ dist, boxes: [input[i], input[j]]});
        }
    }
    pairs = pairs.sort((a, b) => a.dist - b.dist);
    
    const groups = {};
    for (let box of input) {
        const h = hash(box);
        groups[h] = h;
    }

    let lastTwo = null;
    let index = 0;
    while(!isOneGroup(input, groups)) {
        const { boxes } = pairs[index];
        index += 1;
        const b1 = hash(boxes[0]);
        const b2 = hash(boxes[1]);
        union(groups, b1, b2);
        lastTwo = [boxes[0], boxes[1]];
    }

    return lastTwo[0][0] * lastTwo[1][0];
}

function main() {
    const input = readFileSync("input.txt", "utf-8").trim();
    //const input = readFileSync("test.txt", "utf-8").trim();
    const ans = sol(input);
    console.log(ans);
}

main();