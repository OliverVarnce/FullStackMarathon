'use strict'

module.exports = class Access {
    #mark_LXXXV = 'undefined';

    get mark_LXXXV() {
        return this.#mark_LXXXV;
    }

    set mark_LXXXV(v) {
        if (v == null) {
            this.#mark_LXXXV = v;
        } else if (v == undefined) {
            return this.#mark_LXXXV
        } else {
            this.#mark_LXXXV = v;
        }
    }
}