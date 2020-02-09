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

  async whereName (name) {
    return await PagesModel.query().where('name', name).first();
  }

  async updateById (id, data) {
    return await PagesModel.query().where('id', id).update({ data });
  }

  async paginate (page = 1, count = 10) {
    return await PagesModel.query().select('id', 'name').paginate(page, count);
  }
}

module.exports = { PagesRepository };
