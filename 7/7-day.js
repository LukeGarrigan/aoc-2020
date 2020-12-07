const fs = require('fs');
 
let file = fs.readFileSync('7/input.txt');

let rules = file.toString().split('\n');
class Bag {
    constructor(name, count) {
        this.name = name;
        this.children = [];
        this.count = count;
        this.counted = false;
    } 
}

/* console.log(partOne()); */
console.log(partTwo());

function partOne() {

    let familyTree = [];
    for (let rule of rules) {

        let asArray = rule.split(' ');

        let bagName = `${asArray[0]} ${asArray[1]}`;

        let parent = new Bag(bagName);
        familyTree.push(parent);

        if (asArray[4] != 'no') {
            for (let i = 6; i < asArray.length; i+=4) {
                let child = new Bag(`${asArray[i-1]} ${asArray[i]}`);
                parent.children.push(child);
            }
        }
    }

    return getCountCarryingBag(familyTree, 'shiny gold');

}

function getCountCarryingBag(familyTree, name) {
    let count = 0;
    for (let parent of familyTree) {
        for (let child of parent.children) {
            if (child.name == name) {
                if (parent.counted == false) {
                    count++;
                    count += getCountCarryingBag(familyTree, parent.name)
                }
                parent.counted = true;
            }
        }
    }
    return count;
}


function partTwo() {

    let familyTree = [];
    for (let rule of rules) {

        let asArray = rule.split(' ');

        let bagName = `${asArray[0]} ${asArray[1]}`;

        let parent = new Bag(bagName, 1);
        familyTree.push(parent);

        if (asArray[4] != 'no') {
            for (let i = 6; i < asArray.length; i+=4) {
                let child = new Bag(`${asArray[i-1]} ${asArray[i]}`, parseInt(asArray[i-2]));
                parent.children.push(child);
            }
        }
    }

    return getTotalBagCountForBag(familyTree, 'shiny gold') -1;

}


function getTotalBagCountForBag(familyTree, name) {
    let count = 1;
    let shinyGold;
    for (let parent of familyTree) {
        if (parent.name == name) { 
            shinyGold = parent;
        }
    }

    for (let child of shinyGold.children) {
        count += child.count * getTotalBagCountForBag(familyTree, child.name)
    }
    return count;
}
