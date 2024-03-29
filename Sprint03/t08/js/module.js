'use strict'

class LinkedList {
    constructor(data) {
        this.data = {...data};
        this.next = 0;
    }

    [Symbol.iterator] = () => {
        return {
            current: this.next,
            structure: this.data,
            next() {
                if (this.structure[this.current] == undefined) {
                    return {
                        done: true
                    };
                } else {
                    return {
                        done: false, value: this.structure[this.current++]
                    };
                }
            },
        };
    };

    add(value) {
        let counter = 0;
        let obj = {};

        for (const item of this) {
            obj[counter] = item;
            counter++;
        }
        obj[counter] = value;
        this.data = obj;
    }


    remove(value) {
        let counter = 0;
        let obj = {};
        let find = false;

        for (const item of this) {
            if (item == value && find == false) {
                continue;
            }
            obj[counter] = item;
            counter++;
        }
        this.data = obj;
    }

    contains(value) {
        for (const item of this) {
            if (item == value) {
                return true;
            }
        }
        return false;
    }

    clear() {
        this.data = {};
    }

    counter() {
        let counter = 0;
        for (const item of this) {
            counter++;
        }
        return counter;
    }

    log() {
        let arr = Array.from(this);
        console.log(arr.join(", "));
    }
}

function createLinkedList(array) {
    return new LinkedList(array);
}

export {createLinkedList};