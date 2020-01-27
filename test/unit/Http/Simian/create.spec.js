const Database = use('Database')
const Env = use('Env')
const { request, test, trait } = use('Test/Suite')('Simian')
const { SimiansFixture } = use('./../../fixtures/simians')
const DnasModel = use('App/Models/Dnas')
const DnasItensModel = use('App/Models/DnasItens')
const { Enums: { apiResponse } } = use('App/Helpers/enums')

trait('Test/ApiClient')

test('truncate db for TDD', async () => {
    const foreignKeyOff = (Env.get('DB_CONNECTION') == "mysql") ? 'SET FOREIGN_KEY_CHECKS = 0;' : 'PRAGMA foreign_keys = OFF;';
    const foreignKeyOn = (Env.get('DB_CONNECTION') == "mysql") ? 'SET FOREIGN_KEY_CHECKS = 1;' : 'PRAGMA foreign_keys = ON;';

    await Database.raw(foreignKeyOff);
    await DnasModel.truncate();
    await DnasItensModel.truncate();
    await Database.raw(foreignKeyOn)
})

test('success when create simian first time', async ({ client }) => {
    const result = await client.post('/api/simian').send(SimiansFixture.create.success).end();

    result.assertStatus(apiResponse.codes.success);
})

test('badRequest if create same simian again', async ({ client }) => {
    const result = await client.post('/api/simian').send(SimiansFixture.create.success).end();

    result.assertStatus(apiResponse.codes.badRequest);
})

test('forbidden if try create invalid simian body', async ({ client }) => {
    const result = await client.post('/api/simian').send(SimiansFixture.create.error).end();

    result.assertStatus(apiResponse.codes.forbidden);
})

test('unprocessed if try create incorrect simian body', async ({ client }) => {
    const result = await client.post('/api/simian').send(SimiansFixture.create.invalid).end();

    result.assertStatus(apiResponse.codes.unprocessed);
})


test('unprocessed if try create with empty body', async ({ client }) => {
    const result = await client.post('/api/simian').send(SimiansFixture.create.empty).end();

    result.assertStatus(apiResponse.codes.unprocessed);
})