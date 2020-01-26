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
            simian: {
                forbidden: 'FORBIDDEN',
                getUnprocessed: 'UNPROCESSED',
                hasDNA: 'DNA_EXISTS'
            }
        }
    }
}

module.exports = { Enums }