const fs = require('fs');

let file = fs.readFileSync('14/input.txt');

let input = file.toString().split('\n');

// console.log(partOne());
console.log(partTwo());

function partOne() {
    let mask = '';
    let memories = [];
    for (let line of input) {

        let assignee = line.split(' = ')[0];
        let value = line.split(' = ')[1].replace('\r', '');

        if (assignee == 'mask') {
            mask = value;

        } else {
            value = parseInt(value);
            let address = assignee.substring(4, assignee.indexOf(']'));
            let asBinary = value.toString(2);
            asBinary = addLeadingZeros(asBinary);

            let out = '';
            for (let i = 0; i < asBinary.length; i++) {
                if (mask[i] == 'X') {
                    out += asBinary[i];
                } else {
                    out += mask[i];
                }
            }

            let stored = memories.find(e => e.address == address);

            if (stored) {
                stored.value = parseInt(out, 2);
            } else {
                memories.push({ "address": address, "value": parseInt(out, 2) })
            }

        }
    }

    let total = 0;
    memories.forEach(e => total += e.value);
    return total;
}


function partTwo() {
    let mask = '';
    let memories = [];
    for (let line of input) {

        let assignee = line.split(' = ')[0];
        let value = line.split(' = ')[1].replace('\r', '');

        if (assignee == 'mask') {
            mask = value;

        } else {
            value = parseInt(value);
            let address = assignee.substring(4, assignee.indexOf(']'));
            let asBinary = value.toString(2);
            asBinary = addLeadingZeros(parseInt(address).toString(2));

            let out = '';
            for (let i = 0; i < asBinary.length; i++) {
                if (mask[i] == 'X') {
                    out += 'X';
                } else if (mask[i] == '0') {
                    out += asBinary[i];
                } else if (mask[i] == '1') {
                    out += '1';
                }
            }
            let combinations = getCombinationsForMask(out);
            for (let combination of combinations) {
                let stored = memories.find(e => e.address == combination);
                if (stored) {
                    stored.value = value;
                } else {
                    memories.push({ "address": combination, "value": value });
                }
            }
        }
    }
    let total = 0;
    memories.forEach(e => {
        total += e.value;
    });
    return total;
}


function addLeadingZeros(binary) {

    let expectedLength = 36;
    let actualLength = binary.length;
    let zeroCount = expectedLength - actualLength;

    for (let i = 0; i < zeroCount; i++) {
        binary = `0${binary}`;
    }
    return binary;
}



function getCombinationsForMask(mask) {
    let combinations = [];

    getCombinations(0, mask);

    return combinations;

    function getCombinations(index, mask) {

        if (index == mask.length) {
            combinations.push(mask);
            return;
        }

        if (mask[index] == 'X') {
            let newMaskWithZero = mask.substring(0, index) + '0' + mask.substring(index + 1, mask.length);
            let newMaskWithOne = mask.substring(0, index) + '1' + mask.substring(index + 1, mask.length);
            getCombinations(index + 1, newMaskWithZero);
            getCombinations(index + 1, newMaskWithOne);
        } else {
            getCombinations(index + 1, mask);
        }
    }
}



