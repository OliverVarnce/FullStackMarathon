'use strict'

module.exports.getAnonymous = (name, alias, affiliation) => {
    let Anonym = class {
        #name;
        #alias;
        #affiliation;

        constructor () {
            this.#name = name;
            this.#alias = alias;
            this.#affiliation = affiliation;
        }

        get name() {
            return this.#name;
        }

        get alias() {
            return this.#alias;
        }

        get affiliation() {
            return this.#affiliation;
        }

    }

    return new Anonym(name, alias, affiliation);
};

