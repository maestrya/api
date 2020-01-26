
'use strict'
const { DefaultCommand } = use('App/Domain/Commands/default')
const { DnaItensEntity } = use('App/Infrastructure/Entities/DnaItensEntity')
const { Enums: { apiResponse } } = use('App/Helpers/enums')
const { DnasRepository } = use('App/Infrastructure/Repositories/DnasRepository')
const { DnasItensRepository } = use('App/Infrastructure/Repositories/DnasItensRepository')

class SimianCreateCommand extends DefaultCommand {

    rules() {
        return {
            dna: 'required|array',
            'dna.*': 'required|string|min:6|max:6',
        }
    }

    async execute({ response, request }) {
        let result = this.resultDefault();

        const inputs = request.all();
        const validation = await this.validator(inputs, this.rules());

        if (validation != null)
            return this.responseJSON({ result: { body: validation, code: apiResponse.codes.unprocessed }, response })

        try {
            const dnaItensEntity = new DnaItensEntity();
            const { isSimian, resultIsSimian } = dnaItensEntity.verifyIsSimian(inputs.dna);

            if (!isSimian)
                return this.responseJSON({ result: { body: { message: apiResponse.errors.simian.forbidden }, code: apiResponse.codes.forbidden }, response })

            const dnasItensRepository = new DnasItensRepository();
            const haveDna = await dnasItensRepository.whereInValue(inputs.dna);

            const compareExists = dnaItensEntity.compare(haveDna, inputs.dna);

            if (compareExists.length)
                return this.responseJSON({ result: { body: { message: apiResponse.errors.simian.hasDNA }, code: apiResponse.codes.badRequest }, response })

            const dnaData = await new DnasRepository().create({ is_simian: isSimian });

            const dnaItensDataInsert = dnaItensEntity.handleCreate(dnaData.id, resultIsSimian);

            await new DnasItensRepository().create(dnaItensDataInsert);

            result.body = { data: dnaItensDataInsert }
            result.code = apiResponse.codes.success;

        } catch (error) {
            result.body = { message: apiResponse.errors.simian.getUnprocessed }
            result.code = apiResponse.codes.unprocessed;

        }

        return this.responseJSON({ result, response })

    }
}

module.exports = SimianCreateCommand