'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagesSchema extends Schema {
  up () {
    this.create('pages', (table) => {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.json('data').notNullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('pages')
  }
}

module.exports = PagesSchema
