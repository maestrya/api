const Enums = {
    apiResponse: {
        codes: {
            badRequest: 400,
            created: 201,
            forbidden: 403,
            success: 200,
            unprocessed: 422
        },
        errors : {
            pages: {
                forbidden: 'FORBIDDEN',
                getUnprocessed: 'UNPROCESSED',
            }
        }
    }
}

module.exports = { Enums }