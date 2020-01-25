const Enums = {
    apiResponse: {
        codes: {
            badRequest: 400,
            created: 201,
            success: 200,
            unprocessed: 422
        },
        errors : {
            simios: {
                getUnprocessed: 'UNPROCESSED'
            }
        }
    }
}

module.exports = { Enums }