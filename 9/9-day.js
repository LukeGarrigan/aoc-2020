const fs = require('fs');
 
let file = fs.readFileSync('9/input.txt');

let codes = file.toString().split('\n');
const preamble = 25;

/* console.log(partOne()); */
console.log(partTwo());

function partOne() {
    for (let i = preamble; i < codes.length; i++) {
        if (!isSumOfPrevious(i, codes, preamble)) {
            return {'answer': parseInt(codes[i]), 'index': i};
        }
    }
}


function partTwo() {
    let result = partOne();
    let invalidCode = result.answer;
    let index = result.index;
    for (let i = 0; i < index; i++) {
        let contiguousTotal = parseInt(codes[i]);
        let numbers = [parseInt(codes[i])];
        for (let j = i + 1; j < index; j++) {
            let currentNumber = parseInt(codes[j]);
            contiguousTotal += currentNumber;
            numbers.push(currentNumber);
            if (contiguousTotal == invalidCode) {
                numbers.sort((a, b) => a -b);
                return numbers[0] + numbers[numbers.length-1];
            }
        }
    }

}

function isSumOfPrevious(index, codes, preamble) {
    let code = parseInt(codes[index]);
    for (let i = index-preamble; i < index; i++) {
        for (let j = i + 1; j < index; j++) {
            if (parseInt(codes[i]) + parseInt(codes[j]) == code) {
                return true;
            }
        }
    }
    return false;
}
