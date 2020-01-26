'use strict'

const { DefaultModel } = use('./Default')

class DnasItensModel extends DefaultModel {
    static get table() {
        return 'dnas_itens'
    }
}

module.exports = DnasItensModel;