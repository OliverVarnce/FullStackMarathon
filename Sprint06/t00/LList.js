'use strict'

let LLData = require('./LLData');

class LList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    getFirst() {
        if (this.head) {
            return this.head;
        } else {
            return null;
        }
    }

    getLast() {
        let lastNode = this.head;

        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next
            }
        }

        return lastNode
    }

    add(value) {
        let node = new LLData(value);

        if (this.length === 0) {
            this.head = node;
        } else {
            let current = this.head;

            while (current.next) {
                current = current.next;
            }
           current.next = node;
        }
        this.length++;

    }

    addArr(array) {
        array((el) => {
            this.add(el);
        });
    }

    remove(value) {
        if (this.head) {
            while (this.head) {
                if (this.head.value === value) {
                    this.head = this.head.next;
                    return this.head;
                }
            }
        } else {
            return;
        }
    }

    removeAll(value) {
        if (this.head) {
            if (!this.head) {
                return;
            }
            if (this.head && this.head.value === value) {
                this.head = this.head.next
            }
            let currentNode = this.head

            if (currentNode)
                while (currentNode.next) {
                    if (currentNode.next.value === value) {
                        currentNode.next = currentNode.next.next
                    } else {
                        currentNode = currentNode.next
                    }
                }

        } else {
            return;
        }
    }

    contains(value) {
        if (this.head) {
            if ([...this].includes(value)) {
                return true;
            } else {
                return false;
            }
        } else {
            return;
        }
    }

    clear() {
        this.head = null;
        this.length = 0;
    }

    count() {
        let count = 0;
        let node = this.head;

        while (node) {
            count++;
            node = node.next
        }
        return count;
    }

    toString() {
        if (!this.head) {
            return [...this].join(", ");

        } else {
            return;
        }
    }

    *[Symbol.iterator] () {
        let curr = this.head;
        while (curr) {
            yield curr.value;
            curr = curr.next;
        }
    }

    getIterator() {
       //
    }

    filter(callback) {
        if (this.head) {
            return [...this].filter(callback);
        } else {
            return;
        }
    }

    addFromArray(array) {
        array.forEach((el) => {
            this.add(el);
        });
    }
}

module.exports = { LList };