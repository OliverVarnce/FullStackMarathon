'use strict'

let checkDiv = (first = 1, last = 60) => {
    for (let i = first; i <= last; i++) {
        let preRes = []
        let res = [];

        preRes.push(`The number ${i}`);

        if (i % 2 !== 0 && i % 3 !== 0 && i % 10 !== 0) {
            res.push("-");
        }
        if (i % 2 == 0) {
            res.push("is divisible by 2");
        }
        if (i % 3 == 0) {
            res.push("is divisible by 3");
        }
        if (i % 10 == 0) {
            res.push("is divisible by 10");
        }
        res = res.join(", ");

        if (res.includes("-")) {
            res = res.replace(/,/gm, "");
        }

        let afterRes = preRes.concat(res)
        afterRes = afterRes.join(' ')
        console.log(afterRes);
    }
}

module.exports.checkDivision = checkDiv;