
'use strict'
const { DefaultCommand } = use('App/Domain/Commands/default')
const { DnaItensEntity } = use('App/Infrastructure/Entities/DnaItensEntity')
const { Enums: { apiResponse } } = use('App/Helpers/enums')
const { PagesRepository } = use('App/Infrastructure/Repositories/PagesRepository')
const { DnasItensRepository } = use('App/Infrastructure/Repositories/DnasItensRepository')

class SimianCreateCommand extends DefaultCommand {

    rules() {
        return {
            page_test: 'required',
            //HEADER
            'page_test.header.title.accessibility': 'required|string',
            'page_test.header.title.text': 'required|string',
            //BODY
            'page_test.type': 'required|string',
            'page_test.render.*.type': 'required|string',
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

            const dnaData = await new PagesRepository().first({ is_simian: isSimian });

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