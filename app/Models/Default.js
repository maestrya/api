'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const uuid = require('uuid');

class DefaultModel extends Model {
    static boot() {
        const params = {
            id: uuid.v4()
        }
        super.boot();
        /* Before create new record. */
        this.addHook('beforeCreate', async (modelInstance) => {
            modelInstance.id = (modelInstance.id == null) ? params.id : modelInstance.id;
        });
        /* After create new record. */
        this.addHook('afterCreate', async (modelInstance) => {
            modelInstance.id = await params.id
            await delete params.id
            params.id = await uuid.v4();
        })
    }
}

module.exports = { DefaultModel }