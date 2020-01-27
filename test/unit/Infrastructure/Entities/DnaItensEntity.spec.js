const { suite, test } = use('Test/Suite')('DnaItensEntity')
const Database = use('Database')
const Env = use('Env')
const { SimiansFixture } = use('./../../fixtures/simians')
const DnasModel = use('App/Models/Dnas')
const DnasItensModel = use('App/Models/DnasItens')
const { Enums: { apiResponse } } = use('App/Helpers/enums')
const { DnaItensEntity } = use('App/Infrastructure/Entities/DnaItensEntity')

const dnaItensEntity = new DnaItensEntity();

function handleValues(data, is_simian) {
    return data.map((value) => ({
        value,
        is_simian
    }))
}

test('isSimian is true is valid data', async ({ assert }) => {
    const { dna } = SimiansFixture.create.success;
    const result = dnaItensEntity.verifyIsSimian(dna);
    const handleValuesResult = handleValues(dna, true);

    assert.equal(result.isSimian, true)
    assert.equal(result.resultIsSimian.length, handleValuesResult.length)
})

test('isSimian is false is valid data', async ({ assert }) => {
    const { dna } = SimiansFixture.create.invalid;

    const result = dnaItensEntity.verifyIsSimian(dna);
    const handleValuesResult = handleValues(dna, false);

    assert.equal(result.isSimian, false);
    assert.equal(result.resultIsSimian.length, handleValuesResult.length);
})
