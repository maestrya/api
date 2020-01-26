'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DnasSchema extends Schema {
  up() {
    this.create('dnas', (table) => {
      table.uuid('id').primary();
      table.boolean('is_simian').notNullable().defaultTo(false)
      table.timestamps();
    })
  }

  down() {
    this.drop('dnas')
  }
}

module.exports = DnasSchema
