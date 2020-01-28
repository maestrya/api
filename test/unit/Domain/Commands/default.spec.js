const { test, Response } = use('Test/Suite')('DefaultCommand')
const { SimiansFixture } = use('./../../fixtures/simians')
const { DefaultCommand } = use('App/Domain/Commands/default')
const { Enums: { apiResponse } } = use('App/Helpers/enums');

const defaultCommand = new DefaultCommand();


const rulesValidator = {
    dna: 'required|array',
    'dna.*': 'required|string|min:6|max:6',
}

test('return null because is valid', async ({ assert }) => {
    const { success } = SimiansFixture.create;
    const execute = await defaultCommand.validator(success, rulesValidator);
    assert.equal(execute, null);
})

test('not return null because is invalid', async ({ assert }) => {
    const { invalid } = SimiansFixture.create;
    const execute = await defaultCommand.validator(invalid, rulesValidator);
    const resultExpected = (execute.length != 0);

    assert.isTrue(resultExpected);
})

test('same return resultDefault', async ({ assert }) => {
    const execute = defaultCommand.resultDefault();

    assert.deepEqual(execute, {
        body: null,
        code: apiResponse.codes.badRequest
    })
})

