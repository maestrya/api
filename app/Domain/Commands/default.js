'use strict'

const { validate } = use('Validator')

class DefaultCommand {
    async validator(request, rules) {
        const validation = await validate(request, rules);
        return (validation.fails()) ? validation.messages() : null;
    }

    responseJSON({ response, result }) {
        const { body, code } = result;
        return response.status(code).json(body);
    }
}
module.exports = { DefaultCommand }