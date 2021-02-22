'use strict'

class EatException extends Error {

    constructor(stack) {
        super(stack);
        this.name = 'EatException';
        this.message = 'No more junk food, dumpling';
    }
}

module.exports = EatException;