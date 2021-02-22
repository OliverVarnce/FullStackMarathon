'use strict'

const Building = require("./building");

module.exports = class Tower extends Building {
    constructor(hasElevator, arcCapacity, height) {
        super(...arguments);
        this.hasElevator = hasElevator;
        this.arcCapacity = arcCapacity;
        this.height = height;
    }

    getFloorHeight() {
        return this.height / this.floors;
    }

    set hasElevator(v) {
        if (v === true) {
            this.el = `+`;
        } else {
            this.el = `-`;
        }
    }

    toString() {
        return [
            `Floors: ${ this.floors }`,
            `Material: ${ this.material }`,
            `Addres: ${ this.address }`,
            `Elevator: ${ this.el}`,
            `Arc reactor capacity: ${this.arcCapacity}`,
            `Height: ${this.height}`,
            `Floor height: ${this.getFloorHeight()}`,
        ].join('\n')
    }
}