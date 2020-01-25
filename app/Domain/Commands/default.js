'use strict'

const { validate } = use('Validator')

class DefaultCommand {
    async validator(request, rules) {
        const validation = await validate(request, rules);
        return (validation.fails()) ? validation.messages() : null;
    }
}
module.exports = DefaultCommand