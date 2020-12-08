const fs = require('fs');
 
let file = fs.readFileSync('8/input.txt');

let input = file.toString().split('\n');

class Instruction {

    constructor(operation, argument) {
        this.operation = operation;
        this.argument = argument;
        this.processed = false;
    }
}

/* console.log(partOne()); */
console.log(partTwo());


function partOne() {

    const instructions = getInstructions(); 

    let total = 0;
    for (let i = 0; i < instructions.length; i++) {
        const current = instructions[i];
        if (current.processed) {
            return total;
        }
        if (current.operation == 'acc') {
            total += current.argument;
        } else if (current.operation == 'jmp') {
            i = i += (current.argument - 1);
        }
        current.processed = true;
    }
    return -1;

}


function partTwo() {
    let instructionsLength = getInstructions().length;

    for (let i = 0; i < instructionsLength; i++) {
        let instructions = changeOperation(i);
        if (instructions) {
            let value = processWithChangedOperation(instructions);
            if (value != -1) {
                return value;
            }
        }
    }
    return -1;
}


function processWithChangedOperation(instructions) {
    let total = 0;
    for (let i = 0; i < instructions.length; i++) {
        const current = instructions[i];
        if (current.processed) {
            return -1;
        }
        if (current.operation == 'acc') {
            total += current.argument;
        } else if (current.operation == 'jmp') {
            i = i += (current.argument - 1);
        }
        current.processed = true;
        if (i === instructions.length-1) {
            return total;
        } 
    }
    return -1;
}

function changeOperation(index) {
    const instructions = getInstructions(); 
    for (let i = index; i < instructions.length; i++) {
        if (instructions[i].operation == 'nop') {
            instructions[i].operation = 'jmp';
            return instructions;
        } else if (instructions[i].operation == 'jmp') {
            instructions[i].operation = 'nop';
            return instructions;
        }
    }
}




function getInstructions() {
    let instructions = [];
    for (let instruction of input) {
        const operation = instruction.split(" ")[0];
        let argument = instruction.split(" ")[1];

        if (argument.startsWith('+')) {
            argument = argument.substring(1, argument.length);
        }

        argument = parseInt(argument);


        instructions.push(new Instruction(operation, argument));
    }
    return instructions;
}
