const fs = require('fs');


let numbers = [2,20,0,4,1,17];
// console.log(partOne());

console.log(partTwo());
function partOne() {

    for (let i = numbers.length-1; i < 2020; i++) {

        let current = numbers[i];

        let found = false;
        for (let j = i - 1; j >= 0; j--) {
            if (numbers[j] == current) {
                numbers.push(i-j);
                found = true;
                break;
            }
        }

        if (!found) {
            numbers.push(0);
        }
    }
    return numbers[2019];
}




function partTwo() {
    let lastSeen = [];
    for (let i = 0; i < numbers.length-1; i++) {
        lastSeen[numbers[i]] = i;
    }
    for (let i = numbers.length-1; i < 30000000; i++) {
        let last = lastSeen[numbers[i]];
        let newVal;
        if (last > -1) {
            newVal = i - last;
            numbers.push(newVal);
            lastSeen[numbers[i]] = i;
        } else {
            newVal = 0;
            numbers.push(0);
            lastSeen[numbers[i]] = i;
        }

    }
    return numbers[29999999];
}


