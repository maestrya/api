'use strict'

const { validate } = use('Validator');
const { Enums: { apiResponse } } = use('App/Helpers/enums');

class DefaultCommand {
    async validator(request, rules) {
        const validation = await validate(request, rules);
        return (validation.fails()) ? validation.messages() : null;
    }

    responseJSON({ response, result }) {
        const { body, code } = result;
        return response.status(code).json(body);
    }

    resultDefault() {
        return {
            body: null,
            code: apiResponse.codes.badRequest
        }
    }
}
module.exports = { DefaultCommand }