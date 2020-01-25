
'use strict'
const { DefaultCommand } = use('App/Domain/Commands/default')
const { Enums: { apiResponse } } = use('App/Helpers/enums')

class SimiosGetCommand extends DefaultCommand {

    async execute({ response }) {
        let result = {
            body: null,
            code: apiResponse.codes.badRequest
        }

        try {
            result.body = { "count_mutant_dna": 40, "count_human_dna": 100, "ratio": 0.4 }
            result.code = apiResponse.codes.success;
        } catch (error) {
            const { message } = apiResponse.errors.simios.getUnprocessed;
            result.body = { message }
            result.code = apiResponse.codes.unprocessed;
        } finally {
            return this.responseJSON({ result, response })
        }
    }
}

module.exports = SimiosGetCommand