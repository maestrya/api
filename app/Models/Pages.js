'use strict'

const { DefaultModel } = use('./Default')

class PagesModel extends DefaultModel {
    static get table() {
        return 'pages'
    }
}

module.exports = PagesModel;