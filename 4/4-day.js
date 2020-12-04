const fs = require('fs');

let file = fs.readFileSync('./input.txt');

let passports = file.toString().split('\n\r');

/* console.log(partOne()); */
console.log(partTwo());

function partOne() {

    let validCount = 0;
    for (let passport of passports) {
        let containsFields = [false, false, false, false, false, false, false];
        let lines = passport.split('\r\n');

        let fieldsAsOneLine = lines.join(" ").replace('\n', '');
        let fields = fieldsAsOneLine.split(' ');

         for (let field of fields) {
            let keyValue = field.split(':');
            let key = keyValue[0];
            let value = keyValue[1];
            if (key === 'byr') {
                containsFields[0] = true;
            } else if (key === 'iyr') {
                containsFields[1] = true;
            } else if (key === 'eyr') {
                containsFields[2] = true;
            } else if (key === 'hgt') {
                containsFields[3] = true;
            } else if (key === 'hcl') {
                containsFields[4] = true;
            } else if (key === 'ecl') {
                containsFields[5] = true;
            } else if (key === 'pid') {
                containsFields[6] = true;
            }
        }


        if (!containsFields.includes(false)) {
            validCount++;
        }
    }
    return validCount;

}
function partTwo() {

    let validCount = 0;
    for (let passport of passports) {
        let containsFields = [false, false, false, false, false, false, false];
        let lines = passport.split('\r\n');

        let fieldsAsOneLine = lines.join(" ").replace('\n', '');
        let fields = fieldsAsOneLine.split(' ');

         for (let field of fields) {
            let keyValue = field.split(':');
            let key = keyValue[0];
            let value = keyValue[1];
            if (value) {
              value = value.replace('\r', '');
            }
            if (key === 'byr') {
                if (value.length === 4) {
                    let year = parseInt(value);
                    if (year >= 1920 && year <= 2002) {
                        containsFields[0] = true;
                    }
                }
            } else if (key === 'iyr') {
                if (value.length === 4) {
                    let year = parseInt(value);
                    if (year >= 2010 && year <= 2020) {
                        containsFields[1] = true;
                    }
                }
            } else if (key === 'eyr') {
                if (value.length === 4) {
                    let year = parseInt(value);
                    if (year >= 2020 && year <= 2030) {
                        containsFields[2] = true;
                    }
                }
            } else if (key === 'hgt') {
                let lastTwo = value.substring(value.length-2, value.length)
                if (lastTwo === 'in') {
                    let height = parseInt(value.substring(0, value.length-2));
                    if (height >= 59 && height <= 76) {
                        containsFields[3] = true;
                    }
                } else if (lastTwo === 'cm') {
                    let height = parseInt(value.substring(0, value.length-2));
                    if (height >= 150 && height <= 193) {
                        containsFields[3] = true;
                    }
                }
            } else if (key === 'hcl') {
                if (value[0] === '#') {
                    let rest = value.substring(1, value.length);
                    if (rest.length === 6) {
                      let reg = new RegExp('^[a-z0-9]+$')
                      if (reg.test(rest)) {
                        containsFields[4] = true;
                      }
                    }
                }
            } else if (key === 'ecl') {
                if (value === 'amb' || value === 'blu' || value === 'brn' || value === 'gry' || value === 'grn' || value === 'hzl' || value === 'oth') {
                    containsFields[5] = true;
                }
            } else if (key === 'pid') {
                if (value.length === 9) {
                    let reg = new RegExp('^\\d+$')
                    if (reg.test(value)) {
                        containsFields[6] = true;
                    }
                }
            }
        }

        if (!containsFields.includes(false)) {
            validCount++;
        }
    }
    return validCount;

}
