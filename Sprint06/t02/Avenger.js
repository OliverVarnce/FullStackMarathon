'use strict'

class ExtendableFunc extends Function {
    constructor() {
        super('...args', 'return this.__self__.__call__(...args)')
        var self = this.bind(this)
        this.__self__ = self
        return self
    }
}

class Avenger extends ExtendableFunc {
    constructor(heroName, alias, gender, age, powers, hp) {
        super()
        this.heroName = heroName  //this.name = name     will returns the name of the function. Function names are read-only and can not be changed.
        this.alias = alias;
        this.gender = gender;
        this.age = age;
        this.powers = powers;
        this.hp = hp;
    }

    toString() {
        return (
            "name: " + this.heroName+ "\ngender: " + this.gender + "\nage: " + this.age
        );
    }
    __call__(){

        return "alias: " + this.alias.toUpperCase() + '\n' + this.powers.join('\n');
    }
}

module.exports.Avenger = Avenger;