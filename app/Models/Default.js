'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const uuid = require('uuid');
const lodash = require('lodash');
const emptyObject = '{}';

class DefaultModel extends Model {
  static boot () {
    const params = {
      id: uuid.v4()
    };
    super.boot();
		/* Before create new record. */
    this.addHook('beforeCreate', async modelInstance => {
      modelInstance.id = modelInstance.id == null ? params.id : modelInstance.id;
    });
		/* After create new record. */
    this.addHook('afterCreate', async modelInstance => {
      modelInstance.id = await params.id;
      await delete params.id;
      params.id = await uuid.v4();
      const modelData = modelInstance.data ? modelInstance.data : emptyObject;
      modelInstance.data = JSON.parse(modelData);
    });
		/* Before creating or updating a new record. */

    this.addHook('beforeSave', async modelInstance => {
      modelInstance.data = this.handleColumnDataOnSave(modelInstance);
    });
		/* After a single record is fetched from the database. */
    this.addHook('afterFind', async modelInstance => {
      modelInstance.data = JSON.parse(modelInstance.data);
    });
		/* After a single record is fetched from the database. */
    this.addHook('afterPaginate', async modelInstance => {
      modelInstance.data = this._afterFetch(modelInstance);
    });
  }

  static handleColumnDataOnSave (modelInstance) {
    const originalData = modelInstance.$originalAttributes.data;
    const newData = !lodash.isEmpty(originalData)
			? Object.assign(JSON.parse(originalData), modelInstance.data)
			: modelInstance.data;

    return JSON.stringify(newData);
  }

  static _afterFetch (instances, field = 'data') {
    for (let instance of instances) {
      if (instance[field] && typeof instance[field] === 'string') {
        instance[field] = JSON.parse(instance[field]);
      }
    }
  }
}

module.exports = { DefaultModel };
