
'use strict'
const { DefaultCommand } = use('App/Domain/Commands/default')
const { DnaItensEntity } = use('App/Infrastructure/Entities/DnaItensEntity')
const { Enums: { apiResponse } } = use('App/Helpers/enums')
const { DnasRepository } = use('App/Infrastructure/Repositories/DnasRepository')
const { DnasItensRepository } = use('App/Infrastructure/Repositories/DnasItensRepository')
//const DnasItensModel = use('App/Models/DnasItens')

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

        const dnaItensEntity = new DnaItensEntity();
        const { isSimian, resultIsSimian } = dnaItensEntity.verifyIsSimian(inputs.dna);

        const dnaData = await new DnasRepository().create({ is_simian: isSimian });

        const dnaItensDataInsert = dnaItensEntity.handleCreate(dnaData.id, resultIsSimian);
        
        const dnaItensData = await new DnasItensRepository().create(dnaItensDataInsert);


        // return {};
        // try {
        //     result.body = { "count_mutant_dna": 40, "count_human_dna": 100, "ratio": 0.4 }
        //     result.code = apiResponse.codes.success;
        // } catch (error) {
        //     result.body = { message: apiResponse.errors.simian.getUnprocessed }
        //     result.code = apiResponse.codes.unprocessed;
        // } finally {
        //     return this.responseJSON({ result, response })
        // }
    }
}

module.exports = SimianCreateCommand