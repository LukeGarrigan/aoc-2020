const fs = require('fs');

let file = fs.readFileSync('11/input.txt');

let input = file.toString().split('\n');

let seats = extractSeats();


function extractSeats() {
    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].replace('\r', '');
    }

    let seats = [];
    for (let i = 0; i < input.length; i++) {
        seats[i] = [];
        for (let j = 0; j < input[i].length; j++) {
            seats[i][j] = input[i].charAt(j);
        }
    }
    return seats;
}

/* console.log(partOne()); */
console.log(partTwo());



function partOne() {

    let newSeats = JSON.parse(JSON.stringify(seats));
    let change = true;
    do {
        seats = JSON.parse(JSON.stringify(newSeats));
        change = false;
        for (let i = 0; i < seats.length; i++) {

            for (let j = 0; j < seats[i].length; j++) {
                let adjacentOccupied = 0;
                let seat = seats[i][j];
                let adjacentSeats = getAdjacentSeats(i, j);
                for (let neighbour of adjacentSeats) {
                    if (neighbour && neighbour != '.') {
                        if (neighbour == '#') {
                            adjacentOccupied++;
                        }
                    }
                }
                if (adjacentOccupied == 0 && seat == 'L') {
                    newSeats[i][j] = '#';
                    change = true;
                } else if (adjacentOccupied >= 5 && seat == '#') {
                    newSeats[i][j] = 'L';
                    change = true;
                }
            }
        }

    } while (change)

    let count = 0;
    for (let i = 0; i < newSeats.length; i++) {
        for (let j = 0; j < newSeats[i].length; j++) {
            if (newSeats[i][j] == '#') {
                count++;
            }
        }
    }
    return count;
}


function partTwo() {

    let newSeats = JSON.parse(JSON.stringify(seats));
    let change = true;
    do {
        seats = JSON.parse(JSON.stringify(newSeats));
        change = false;
        for (let i = 0; i < seats.length; i++) {

            for (let j = 0; j < seats[i].length; j++) {
                let seat = seats[i][j];
                let adjacentSeatsCount = getOccupiedSeats(i, j);
                if (adjacentSeatsCount == 0 && seat == 'L') {
                    newSeats[i][j] = '#';
                    change = true;
                } else if (adjacentSeatsCount >= 5 && seat == '#') {
                    newSeats[i][j] = 'L';
                    change = true;
                }
            }
        }

    } while (change)

    let count = 0;
    for (let i = 0; i < newSeats.length; i++) {
        for (let j = 0; j < newSeats[i].length; j++) {
            if (newSeats[i][j] == '#') {
                count++;
            }
        }
    }
    return count;
}

function getOccupiedSeats(x, y) {

    let occupiedSeats = 0;
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          
            if (dx == 0 && dy == 0) continue;

            let X = x;
            let Y = y;

            X += dx;
            Y += dy;

            while(X >= 0 && X < seats.length && Y >= 0 && Y < seats[0].length) {
                if (seats[X][Y] == 'L') {
                    break;
                }
                if (seats[X][Y] == '#') {
                    occupiedSeats++;
                    break;
                }
                X += dx;
                Y += dy;
            }
        }
    }

    return occupiedSeats;
}



function getAdjacentSeats(i, j) {
    let adjacentSeats = [];
    if (i - 1 >= 0)
        adjacentSeats.push(seats[i - 1][j]);
    if (i - 1 >= 0 && j - 1 >= 0)
        adjacentSeats.push(seats[i - 1][j - 1]);
    if (j - 1 >= 0)
        adjacentSeats.push(seats[i][j - 1]);
    if (i + 1 < seats.length && j - 1 >= 0)
        adjacentSeats.push(seats[i + 1][j - 1]);
    if (i + 1 < seats.length)
        adjacentSeats.push(seats[i + 1][j]);
    if (i + 1 < seats.length && j + 1 < seats[1].length)
        adjacentSeats.push(seats[i + 1][j + 1]);
    if (j + 1 < seats[1].length)
        adjacentSeats.push(seats[i][j + 1]);
    if (i - 1 >= 0 && j + 1 < seats[1].length)
        adjacentSeats.push(seats[i - 1][j + 1]);
    return adjacentSeats;
}

