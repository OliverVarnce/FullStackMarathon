'use strict'

let end = 1;

function* idMaker(start = 10 ) {
    let enter;
    for (let i = 0; i < start; i++) {
        yield (enter = prompt("Previous result: " + end + ". Enter a new number:"));
        if (Number(enter) > 10000) {
            end = 1;
        } else if (Number.isNaN(Number(enter))) {
            console.error("Invalid number!");
        } else {
            end += Number(enter);
        }
    }
}

for (let k of idMaker()) {}