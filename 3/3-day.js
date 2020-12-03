const fs = require('fs');

let file = fs.readFileSync('./input.txt');

let input = file.toString().split('\r\n');

console.log(partOne());
console.log(partTwo());

function partOne() {
    let currentPos = 0;

    let hitTreeCount = 0;
    for (let treeLine of input) {

        if (treeLine[currentPos] === '#') {
            hitTreeCount++;
        }
        currentPos += 3;
        currentPos = currentPos % treeLine.length;
    }
    return hitTreeCount;
}



function partTwo() {
    let total = 1;
    total *= slope(1, 1);
    total *= slope(3, 1);
    total *= slope(5, 1);
    total *= slope(7, 1);
    total *= slope(1, 2);
    return total;
}

function slope(right, down) {
    let currentPos = 0;

    let hitTreeCount = 0;
    for (let i = 0; i < input.length; i+=down) {
        let treeLine = input[i];
        if (treeLine[currentPos] === '#') {
            hitTreeCount++;
        }
        currentPos += right;
        currentPos = currentPos % treeLine.length;
    }
    return hitTreeCount;
}

