const fs = require('fs');

let file = fs.readFileSync('13/input.txt');

let input = file.toString().split('\n');

let depart = parseInt(input[0]);

let buses = input[1].split(',');
// console.log(partOne());
console.log(partTwo());

function partOne() {
    buses = buses.filter(e => e != 'x');
    let busAndDepartTimes = [];
    for (let index = 0; index < buses.length; index++) {
        const bus = parseInt(buses[index]);
        let currentTime = bus;
        while(true) {
            if (currentTime > depart) {
                busAndDepartTimes.push({bus, currentTime})
                break;
            }
            currentTime += bus;
        }
    }
    busAndDepartTimes = busAndDepartTimes.sort((a, b) => a.currentTime - b.currentTime);
    return (busAndDepartTimes[0].currentTime - depart) * busAndDepartTimes[0].bus;

}

function partTwo() {
    let inc = parseInt(buses[0]);
    let time = 0;

    for (let i = 1; i < buses.length; i++) {

        if (buses[i] != 'x') {
            var newBusTime = parseInt(buses[i]);
            while (true) {
                time += inc;
                if ((time + i) % newBusTime == 0) {
                    inc *= newBusTime;
                    break;
                }
            }
        }
    }
    return time;
}
