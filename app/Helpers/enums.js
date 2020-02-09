const Enums = {
  apiResponse: {
    codes: {
      badRequest: 400,
      created: 201,
      forbidden: 403,
      notFound: 404,
      success: 200,
      unprocessed: 422
    },
    errors: {
      generic: {
        notFound: 'NOT_FOUND',
        getUnprocessed: 'UNPROCESSED'
      },
      pages: {
        notFound: 'NOT_FOUND_PAGE',
        forbidden: 'FORBIDDEN',
        getUnprocessed: 'UNPROCESSED'
      }
    }
  }
};

module.exports = { Enums };
