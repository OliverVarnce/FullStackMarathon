'use strict'

class HardWorker {
    set age(v) {
        if (v >= 1 || v < 100) {
            this.age1 = v;
        } else {
            return;
        }
    }

    set salary(v) {
        if (v >= 100 || v < 10000) {
            this.salary1 = v;
        } else {
            return;
        }
    }

    toObject() {
        return {
            name: this.name,
            age: this.age1,
            salary: this.salary1
        }
    }
}

module.exports = HardWorker;
