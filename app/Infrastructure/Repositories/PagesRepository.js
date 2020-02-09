'use strict';

const DefaultRepository = use('App/Infrastructure/Repositories/Default');
const PagesModel = use('App/Models/Pages');

class PagesRepository extends DefaultRepository {
  async create (params) {
    return await PagesModel.create(params);
  }

  async first () {
    return await PagesModel.first();
  }
}

module.exports = { PagesRepository };
