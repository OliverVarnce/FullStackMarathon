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

const ll = createLinkedList([100, 1, 2, 3, 100, 4, 5, 100]);
ll.log();
//100, 1, 2, 3, 100, 4, 5, 100
while(ll.remove(100));
ll.log();
// "1, 2, 3, 4, 5"
ll.add(10);ll.log();
// "1, 2, 3, 4, 5, 10"
console.log(ll.contains(10));
// "true"

let sum = 0;
for(const n of ll) {
    sum += n;
}
console.log(sum);
// "25"

ll.clear();
ll.log();
// ""