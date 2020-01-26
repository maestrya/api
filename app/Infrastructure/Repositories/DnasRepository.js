'use strict'

const DefaultRepository = use('App/Infrastructure/Repositories/Default');
const DnasModel = use('App/Models/Dnas')

class DnasRepository extends DefaultRepository {
    async create(params) {
        return await DnasModel.create(params);
    }
}

module.exports = { DnasRepository }
