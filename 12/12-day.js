const fs = require('fs');

let file = fs.readFileSync('12/input.txt');

let input = file.toString().split('\n');

// console.log(partOne());
console.log(partTwo());



function partOne() {
    let currentAngle = 90;
    let eastAmount = 0;
    let northAmount = 0;
    for (let index = 0; index < input.length; index++) {
        const action = input[index];
       
        let dir = action.charAt(0);
        let amount = parseInt(action.substring(1, action.length));

        if (dir == 'F') {
            if (currentAngle == 90) {
                eastAmount += amount;
            } else if (currentAngle == 180) {
                northAmount -= amount;
            } else if (currentAngle == 270) {
                eastAmount -= amount;
            } else if (currentAngle == 0) {
                northAmount += amount;
            } else {
                console.log('hey');
            }
        } else if (dir == 'R') {
            let newDir = currentAngle + amount;
            newDir = mod(newDir, 360);
            currentAngle = newDir;
        } else if (dir == 'L') {
            let newDir = currentAngle - amount;
            newDir = mod(newDir, 360);
            currentAngle = newDir;
        } else if (dir == 'N') {
            northAmount += amount;
        } else if (dir == 'S') {
            northAmount -= amount;
        } else if (dir == 'E') {
            eastAmount += amount;
        } else if (dir == 'W') {
            eastAmount -= amount;
        }
    }
    return Math.abs(eastAmount) + Math.abs(northAmount);
}



function partTwo() {
    let wpEastAmount = 10;
    let wpNorthAmount = 1;
    let shipEastAmount = 0;
    let shipNorthAmount = 0;

    for (let index = 0; index < input.length; index++) {
        const action = input[index];
       
        let dir = action.charAt(0);
        let amount = parseInt(action.substring(1, action.length));

        if (dir == 'F') {
            shipEastAmount += wpEastAmount * amount;
            shipNorthAmount += wpNorthAmount * amount;
        } else if (dir == 'R') {
            let ticks = amount / 90;
            for (let i =0; i < ticks; i++) {
                let x = wpEastAmount;
                let y = wpNorthAmount
                wpEastAmount = y;
                wpNorthAmount = -x;
            }
        } else if (dir == 'L') {
            let ticks = amount / 90;
            for (let i =0; i < ticks; i++) {
                let x = wpEastAmount;
                let y = wpNorthAmount
                wpNorthAmount = x;
                wpEastAmount = -y;
            }
        } else if (dir == 'N') {
            wpNorthAmount += amount;
        } else if (dir == 'S') {
            wpNorthAmount -= amount;
        } else if (dir == 'E') {
            wpEastAmount += amount;
        } else if (dir == 'W') {
            wpEastAmount -= amount;
        } 
    }
    return Math.abs(shipEastAmount) + Math.abs(shipNorthAmount); 
}



function mod(n, m) {
    return ((n % m) + m) % m;
  }


