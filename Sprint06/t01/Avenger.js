class SelfFunc extends Function {
    constructor() {
        super('...args', 'return this.__self__.__call__(...args)')
        let self = this.bind(this)
        this.__self__ = self
        return self
    }
}

class Avenger extends SelfFunc {
    constructor( { name, alias, gender, age, powers } ) {
        super();
        this.Name = name;
        this.alias = alias;
        this.gender = gender;
        this.age = age;
        this.powers = powers;
    }

    toString() {
        return (
            "name: " + this.Name+ "\ngender: " + this.gender + "\nage: " + this.age
        );
    }

    __call__(){
        return "alias: " + this.alias.toUpperCase() + '\n' + this.powers.join('\n');
    }
}

module.exports.Avenger = Avenger;