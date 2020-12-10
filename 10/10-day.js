const fs = require('fs');
 
let file = fs.readFileSync('10/input.txt');

let input = file.toString().split('\n');
let jolts = input.map(e => parseInt(e));
let permutations = [];

jolts.push(0);
jolts = jolts.sort((a, b) => a - b);

jolts.push(jolts[jolts.length-1]+3); // end jolt

console.log(partOne());
console.log(partTwo());

function partOne() {
    let ones = 0;
    let threes = 0;
    let previous = 0;
    for (let i = 0; i < jolts.length; i++ ) {
        
        let difference = jolts[i] - previous;

        if (difference == 1) {
            ones++;
        } else if (difference == 3) {
            threes++;
        }

        previous = jolts[i];
    }
    return ones * threes;
}

function partTwo() {
    return permute(0);
}

function permute(pos) {
    if (pos == jolts.length-1) {
        return 1;
    }

    let permutation = permutations.find(e => e.index == pos)
    if (permutation) {
        return permutation.count;
    }

    let count = 0;
    for (let i = pos + 1; i < pos + 4; i++) {
        if (jolts[i]-jolts[pos] <= 3) {
            count += permute(i);
        }
    }

    permutations.push({
        index: pos,
        count: count
    });
    return count;
}
