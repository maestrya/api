const Enums = {
    apiResponse: {
        codes: {
            badRequest: 400,
            created: 201,
            success: 200,
            unprocessed: 422
        },
        errors : {
            simian: {
                getUnprocessed: 'UNPROCESSED'
            }
        }
    }
}

module.exports = { Enums }