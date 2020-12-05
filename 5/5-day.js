const fs = require('fs');
 
let file = fs.readFileSync('./input.txt');

let input = file.toString().split('\r\n'); 

/* console.log(partOne()); */
console.log(partTwo());


function partOne() {

    let max = 0;
    for (let boardingPass of input) {
        let minRow = 0;
        let maxRow = 127;
    
        for (let i = 0; i < 7; i++) {
            let fOrB = boardingPass[i];
            if (fOrB == 'B') {
                minRow = Math.round((minRow + maxRow) / 2);
            } else if (fOrB == 'F') {
                maxRow = Math.floor((minRow + maxRow) / 2);
            }
        }
    
        let minSeat = 0;
        let maxSeat = 7;
        for (let i = 7; i < 10; i++) {
            let lOrR = boardingPass[i];
            if (lOrR == 'R') {
                minSeat = Math.round((minSeat + maxSeat) / 2);
            } else if (lOrR == 'L') {
                maxSeat = Math.floor((minSeat + maxSeat) / 2);
            }
        }
    
        let id = maxRow * 8 + maxSeat;

        if (id > max) {
            max = id;
        }
    }

    return max;

}


function partTwo() {

    let ids = [];
    let max = 0;
    for (let boardingPass of input) {
        let minRow = 0;
        let maxRow = 127;
    
        for (let i = 0; i < 7; i++) {
            let fOrB = boardingPass[i];
            if (fOrB == 'B') {
                minRow = Math.round((minRow + maxRow) / 2);
            } else if (fOrB == 'F') {
                maxRow = Math.floor((minRow + maxRow) / 2);
            }
        }
    
        let minSeat = 0;
        let maxSeat = 7;
        for (let i = 7; i < 10; i++) {
            let lOrR = boardingPass[i];
            if (lOrR == 'R') {
                minSeat = Math.round((minSeat + maxSeat) / 2);
            } else if (lOrR == 'L') {
                maxSeat = Math.floor((minSeat + maxSeat) / 2);
            }
        }
    
        let id = maxRow * 8 + maxSeat;

        ids.push(id);
        if (id > max) {
            max = id;
        }
    }

    ids = ids.sort((a, b) => a - b);

    let count = 0;
    for (let i = ids[0]; i < ids.length; i++) {
        if (ids[count] != i) {
            return i;
        }
        count ++;
    }
    return -1;
}