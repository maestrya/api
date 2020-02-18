'use strict';

const Database = use('Database');
const PagesModel = use('App/Models/Pages');
const Env = use('Env');
const { PagesData } = use('./Data/Pages');

class DatabaseSeeder {
  async run () {
    const foreignKeyOff =
			Env.get('DB_CONNECTION') == 'mysql' ? 'SET FOREIGN_KEY_CHECKS = 0;' : 'PRAGMA foreign_keys = OFF;';
    const foreignKeyOn =
			Env.get('DB_CONNECTION') == 'mysql' ? 'SET FOREIGN_KEY_CHECKS = 1;' : 'PRAGMA foreign_keys = ON;';

    await Database.raw(foreignKeyOff);

    await PagesModel.truncate();

    await PagesModel.createMany([
      {
        id: '3fbc4824-1f94-41e1-9c55-b20c407c394c',
        name: 'page_test',
        data: PagesData,
      },
      {
        id: '8dcf3410-7dcc-4901-85da-3a013a914300',
        name: 'bankera_home',
        data: PagesData,
      }
    ]);

    await Database.raw(foreignKeyOn);
  }
}

module.exports = DatabaseSeeder;
