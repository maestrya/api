'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DnasItensSchema extends Schema {
  up() {
    this.create('dnas_itens', (table) => {
      table.uuid('id').primary();
      table.uuid('dna_id')
        .references('id')
        .inTable('dnas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('value', 6).notNullable();
      table.boolean('is_simian').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('dnas_itens')
  }
}

module.exports = DnasItensSchema
