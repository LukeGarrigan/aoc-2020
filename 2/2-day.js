const fs = require('fs');

let file = fs.readFileSync('./input.txt');

let input = file.toString().split('\r\n');

console.log(partOne())
console.log(partTwo())

function partOne() {
    let count = 0;
    for (let line of input) {
        const min = parseInt(line.split('-')[0]);
        const max = parseInt(line.split('-')[1].split(' ')[0]);
        const letter = line[line.indexOf(':') -1];
        const password = line.split(' ')[2];
        
        const occurences = password.split(letter).length-1;

        if (occurences >= min && occurences <= max) {
            count ++;
        }
    }
    return count;
}

function partTwo() {
    let count = 0;
    for (let line of input) {
        const firstIndex = parseInt(line.split('-')[0])-1;
        const secondIndex = parseInt(line.split('-')[1].split(' ')[0])-1;
        const letter = line[line.indexOf(':') -1];
        const password = line.split(' ')[2];
        
        let containsLetterCount = 0;
        if (password[firstIndex] == letter) {
            containsLetterCount++;
        }
        if (password[secondIndex] == letter) {
            containsLetterCount++;
        }

        if (containsLetterCount == 1) {
            count++;
        }
    }
    return count;
}

