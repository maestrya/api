'use strict';
const { DefaultCommand } = use('App/Domain/Commands/default');
const { Enums: { apiResponse } } = use('App/Helpers/enums');
const { PagesRepository } = use('App/Infrastructure/Repositories/PagesRepository');

class PagesPaginateCommand extends DefaultCommand {
  async execute ({ response }) {
    let result = this.resultDefault();

    try {
      const pagesData = await new PagesRepository().paginate();

      result.body = pagesData;
      result.code = apiResponse.codes.success;
    } catch (error) {
      result.body = { message: apiResponse.errors.pages.getUnprocessed };
      result.code = apiResponse.codes.unprocessed;
    }

    return this.responseJSON({ result, response });
  }
}

module.exports = PagesPaginateCommand;
