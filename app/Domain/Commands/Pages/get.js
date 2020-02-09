'use strict';
const { DefaultCommand } = use('App/Domain/Commands/default');
const { Enums: { apiResponse } } = use('App/Helpers/enums');
const { PagesRepository } = use('App/Infrastructure/Repositories/PagesRepository');

class PagesGetCommand extends DefaultCommand {
  async execute ({ request, response }) {
    let result = this.resultDefault();

    try {
      const pagesData = await new PagesRepository().whereName(request.params.name);

      if (pagesData) {
        result.body = pagesData;
        result.code = apiResponse.codes.success;
      } else if (!pagesData) {
        result.body = { message: apiResponse.errors.pages.notFound };
        result.code = apiResponse.codes.notFound;
      }
    } catch (error) {
      result.body = { message: apiResponse.errors.pages.getUnprocessed };
      result.code = apiResponse.codes.unprocessed;
    }

    return this.responseJSON({ result, response });
  }
}

module.exports = PagesGetCommand;
