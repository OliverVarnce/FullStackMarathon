'use strict'

const { Avenger } = require("./Avenger");

class Team {
    constructor(id, avengers) {
        this.id = id;
        this.avengers = avengers;
    }

    battle(damage) {
        for (let avenger of this.avengers) {
            let hp = avenger.hp - damage.damage;
            avenger.hp = hp;
        }
    }
    clone() {
        let arr = [];
        this.avengers.forEach((element) => {
            let copy = Object.assign({}, element);
            let proto = Object.getPrototypeOf(element);
            Object.setPrototypeOf(copy, proto);
            arr.push(copy);
        });
        return (this.avengers = arr);
    }

    calculateLosses(clonedTeam) {
        let count = 0;
        for (let avenger of clonedTeam) {
            if (avenger.hp < 1) {
                count++;
            }
        }
        if (count == 0) {
            console.log("We haven't lost anyone in this battle");
        } else {
            console.log(`In this battle we lost ${count} Avengers`);
        }
    }
}

module.exports = { Team }