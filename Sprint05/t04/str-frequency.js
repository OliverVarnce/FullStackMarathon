'use strict'

class strFrequency {
    constructor(str){
        this.v = str.valueOf();
    }

    letterFrequencies() {
        let allowed = /[a-z]/i
        let data = {}
        let letter
        for (let i = 0; i < this.v.length; i++) {
            if (allowed.test(this.v.charAt(i))) {
                letter = this.v.charAt(i).toUpperCase()
                if (data[letter] === undefined) {
                    data[letter] = 0
                }
                data[letter] += 1
            }
        }
        return data
    }

    wordFrequencies() {
        let data = {}
        if (this.v === '') {
            data[this.v] = 1
            return data
        }
        let split = this.v.toUpperCase().split(/[^a-z]/i)
        let allowed = /[a-z]/i
        for (let i in split) {
            if (allowed.test(split[i])) {
                if (data[split[i]] === undefined)
                    data[split[i]] = 0
                data[split[i]]++
            }
        }
        return data
    }

    reverseString() {
            return this.v.split("").reverse().join("");
    }
}

module.exports = strFrequency;