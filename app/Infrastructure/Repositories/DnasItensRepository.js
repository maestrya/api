'use strict'

const DefaultRepository = use('./Default');
const DnasItensModel = use('App/Models/DnasItens')

class DnasItensRepository extends DefaultRepository {
    async create(params) {
        return await DnasItensModel.createMany(params);
    }

    async whereInValue(ids = []) {
        return await this.database().select('dna_id', 'value').from('dnas_itens').whereIn('value', ids);
    }
}

module.exports = { DnasItensRepository }
