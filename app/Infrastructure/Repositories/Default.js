'use strict'

const Database = use('Database')
const Model = use('Model')

class DefaultRepository extends Model {
    database() {
        return Database;
    }
}

module.exports = DefaultRepository