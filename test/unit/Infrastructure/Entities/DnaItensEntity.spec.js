const { test } = use('Test/Suite')('DnaItensEntity')
const { SimiansFixture } = use('./../../fixtures/simians')
const { DnaItensEntity } = use('App/Infrastructure/Entities/DnaItensEntity')
const uuid = require('uuid');

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

    assert.isTrue(result.isSimian)
    assert.deepEqual(result.resultIsSimian, handleValuesResult)
})

test('isSimian is false is valid data', async ({ assert }) => {
    const { dna } = SimiansFixture.create.invalid;

    const result = dnaItensEntity.verifyIsSimian(dna);
    const handleValuesResult = handleValues(dna, false);

    assert.isFalse(result.isSimian);
    assert.deepEqual(result.resultIsSimian, handleValuesResult);
})

test('success valid handleCreate', async ({ assert }) => {
    const { dna } = SimiansFixture.create.success;
    const dna_id = uuid.v4();

    const result = dnaItensEntity.handleCreate(dna_id, dna);
    assert.equal(result.length, dna.length);
})


test('zero when send only dna_id in handleCreate', async ({ assert }) => {
    const dna_id = uuid.v4();
    const empty = 0;

    const result = dnaItensEntity.handleCreate(dna_id);
    assert.equal(result.length, empty);
})

test('zero when empty DNA in handleCreate', async ({ assert }) => {
    const dna = [];
    const dna_id = uuid.v4();
    const empty = 0;

    const result = dnaItensEntity.handleCreate(dna_id, dna);
    assert.equal(result.length, empty);
})

test('zero when same DNA in compare', async ({ assert }) => {
    const valid = SimiansFixture.create.success.dna;
    const resultExpected = 0;

    const result = dnaItensEntity.compare(valid, valid);

    assert.equal(result.length, resultExpected);
})

test('zero when empty DNA in compare', async ({ assert }) => {
    const valid = SimiansFixture.create.success.dna;
    const invalid = SimiansFixture.create.invalid;

    const result = dnaItensEntity.compare(valid, invalid);
    const resultExpected = (result.length != 0);

    assert.isTrue(resultExpected);
})
