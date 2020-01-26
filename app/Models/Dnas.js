'use strict'

const { DefaultModel } = use('./Default')

class DnasModel extends DefaultModel {
    static get table() {
        return 'dnas'
    }
}

module.exports = DnasModel;