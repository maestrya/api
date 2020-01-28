
'use strict'
const { DefaultCommand } = use('App/Domain/Commands/default')
const { Enums: { apiResponse } } = use('App/Helpers/enums')

class SimianGetCommand extends DefaultCommand {

    async execute({ response }) {
        let result = this.resultDefault();

        try {
            result.body = { "count_mutant_dna": 40, "count_human_dna": 100, "ratio": 0.4 }
            result.code = apiResponse.codes.success;
        } catch (error) {
            result.body = { message: apiResponse.errors.simian.getUnprocessed }
            result.code = apiResponse.codes.unprocessed;
        }

        return this.responseJSON({ result, response })

    }
}

module.exports = SimianGetCommand