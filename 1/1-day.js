const fs = require('fs');

let file = fs.readFileSync('./input.txt');

let input = file.toString().split('\r\n');
input = input.map(e => parseInt(e));
const mustEqual = 2020;

console.log(partOne())
console.log(partTwo())


function partOne() {

    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[i] + input[j] === mustEqual) {
                return input[i] * input[j];
            }
        }
    }
}

function partTwo() {
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            for (let x = j + 1; x < input.length; x++) {
                if (input[i] + input[j] + input[x] === mustEqual) {
                    return input[i] * input[j] * input[x];
                }
            }
        }
    }
}

