import { SESSION_KEY } from './secret.js';
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';

async function getInput(year, day) {
    const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        "headers": {
            "Cookie": `session=${SESSION_KEY}`
        },
        "method": "GET",
    });
    return await response.text();
}

function makeDir(dir) {
    if (!existsSync(dir)) {
        mkdirSync(dir);
    }
}

function createInputFile(day, content) {
    writeFileSync(`day/${day}/input.txt`, content);
}

function createTemplateFiles(day) {
    const contents = readFileSync("template/p.js", "utf-8");
    writeFileSync(`day/${day}/p1.js`, contents);
}

async function main() {
    const YEAR = 2025;
    const DAY = process.argv[2];
    
    // Make Dir
    makeDir(`day/${DAY}`);

    // Pull and save input file
    createInputFile(DAY, await getInput(YEAR, DAY));

    // Create template files
    createTemplateFiles(DAY);
}

main();