const fs = require('fs');
 
let file = fs.readFileSync('6/input.txt');

let groups = file.toString().split('\r\n\r');

/* console.log(partOne()); */
console.log(partTwo());


function partOne() {

    let count = 0;
    for (let group of groups) {

        group = group.split('\n').join('');        
        group = group.split('\r').join('');


        let asArray = group.split('');

        asArray = asArray.filter((value, index) => asArray.indexOf(value) === index);

        count += asArray.length;

    }

    return count;
}


function partTwo() {

    let count = 0;
    for (let group of groups) {
        let chosen = [];
        let persons = group.split('\r');
      
        chosen.push(...persons[0].replace('\n', '').split(''));
        if (persons.length == 1) {
            count += persons[0].replace('\n', '').split('').length;
        } else {
            for (let i = 1; i < persons.length; i++) {
                let personChoices = persons[i].replace('\n','').split('')
           
                for (let i = chosen.length -1 ; i >= 0; i--) {
    
                    if (personChoices.indexOf(chosen[i]) == -1) {
                        chosen.splice(i, 1);
                    }
                }
            }
            count += chosen.length;
        }
    }

    return count;
}
