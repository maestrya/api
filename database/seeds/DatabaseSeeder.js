'use strict'

const Database = use('Database')
const DnasModel = use('App/Models/Dnas')
const DnasItensModel = use('App/Models/DnasItens')
const Env = use('Env')

class DatabaseSeeder {
  async run() {
    const foreignKeyOff = (Env.get('DB_CONNECTION') == "mysql") ? 'SET FOREIGN_KEY_CHECKS = 0;' : 'PRAGMA foreign_keys = OFF;';
    const foreignKeyOn = (Env.get('DB_CONNECTION') == "mysql") ? 'SET FOREIGN_KEY_CHECKS = 1;' : 'PRAGMA foreign_keys = ON;';

    await Database.raw(foreignKeyOff);

    await DnasModel.truncate();
    await DnasItensModel.truncate();

    await DnasModel.createMany([{
      id: '3fbc4824-1f94-41e1-9c55-b20c407c394c',
      is_simian: true,
    },
    {
      id: '84ca67e2-71f3-4af2-8525-8b8f12275ca0',
      is_simian: false,
    }
    ]);


    await DnasItensModel.createMany([
      //3fbc4824-1f94-41e1-9c55-b20c407c394c
      {
        dna_id: '3fbc4824-1f94-41e1-9c55-b20c407c394c',
        value: 'CTGAGA',
        is_simian: true,
      },
      {
        dna_id: '3fbc4824-1f94-41e1-9c55-b20c407c394c',
        value: 'CTGAGC',
        is_simian: true,
      },
      {
        dna_id: '3fbc4824-1f94-41e1-9c55-b20c407c394c',
        value: 'TATTGT',
        is_simian: true,
      },
      {
        dna_id: '3fbc4824-1f94-41e1-9c55-b20c407c394c',
        value: 'AGAGGG',
        is_simian: true,
      },
      {
        dna_id: '3fbc4824-1f94-41e1-9c55-b20c407c394c',
        value: 'CCCCTA',
        is_simian: true,
      },
      {
        dna_id: '3fbc4824-1f94-41e1-9c55-b20c407c394c',
        value: 'TCACTG',
        is_simian: false,
      },
      //84ca67e2-71f3-4af2-8525-8b8f12275ca0
      {
        dna_id: '84ca67e2-71f3-4af2-8525-8b8f12275ca0',
        value: 'CTGAGA',
        is_simian: false,
      },
      {
        dna_id: '84ca67e2-71f3-4af2-8525-8b8f12275ca0',
        value: 'CTGAGC',
        is_simian: false,
      },
      {
        dna_id: '84ca67e2-71f3-4af2-8525-8b8f12275ca0',
        value: 'TATTGT',
        is_simian: false,
      },
      {
        dna_id: '84ca67e2-71f3-4af2-8525-8b8f12275ca0',
        value: 'AGAGGG',
        is_simian: false,
      },
      {
        dna_id: '84ca67e2-71f3-4af2-8525-8b8f12275ca0',
        value: 'CCCCTA',
        is_simian: false,
      },
      {
        dna_id: '84ca67e2-71f3-4af2-8525-8b8f12275ca0',
        value: 'TCACTG',
        is_simian: false,
      },
    ]);

    await Database.raw(foreignKeyOn)
  }
}

module.exports = DatabaseSeeder