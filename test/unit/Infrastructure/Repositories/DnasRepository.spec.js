const { test } = use('Test/Suite')('DnasRepository');
const { SimiansFixture } = use('./../../fixtures/simians')
const { DnasItensRepository } = use('App/Infrastructure/Repositories/DnasItensRepository');
const Database = use('Database')
const Env = use('Env')
const DnasModel = use('App/Models/Dnas')
const DnasItensModel = use('App/Models/DnasItens')
const { Enums: { apiResponse } } = use('App/Helpers/enums')
const { DnaItensEntity } = use('App/Infrastructure/Entities/DnaItensEntity')
const { DnasRepository } = use('App/Infrastructure/Repositories/DnasRepository')

const dnasItensRepository = new DnasItensRepository();
const dnaItensEntity = new DnaItensEntity();

async function truncateDB() {
    test('truncate db for TDD', async () => {
        const foreignKeyOff = (Env.get('DB_CONNECTION') == "mysql") ? 'SET FOREIGN_KEY_CHECKS = 0;' : 'PRAGMA foreign_keys = OFF;';
        const foreignKeyOn = (Env.get('DB_CONNECTION') == "mysql") ? 'SET FOREIGN_KEY_CHECKS = 1;' : 'PRAGMA foreign_keys = ON;';
    
        await Database.raw(foreignKeyOff);
        await DnasModel.truncate();
        await DnasItensModel.truncate();
        await Database.raw(foreignKeyOn)
    })
    
}
truncateDB();

test('create with success', async ({ assert }) => {
    const { dna } = SimiansFixture.create.success;
    const { isSimian } = dnaItensEntity.verifyIsSimian(dna);    
    const dnaData = await new DnasRepository().create({ is_simian: isSimian });
    const uuidLenght = 36;
    const resultExpected = (dnaData.id.length == uuidLenght);

    assert.isTrue(resultExpected);
})


