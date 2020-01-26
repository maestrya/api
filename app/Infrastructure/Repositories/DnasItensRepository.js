'use strict'

const DefaultRepository = use('./Default');
const DnasItensModel = use('App/Models/DnasItens')

class DnasItensRepository extends DefaultRepository {
    async create(params) {
        return await DnasItensModel.createMany(params);
    }
}

module.exports = { DnasItensRepository }
