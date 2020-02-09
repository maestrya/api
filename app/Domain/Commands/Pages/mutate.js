'use strict';
const { DefaultCommand } = use('App/Domain/Commands/default');
const { Enums: { apiResponse } } = use('App/Helpers/enums');
const { PagesRepository } = use('App/Infrastructure/Repositories/PagesRepository');

class PagesMutateCommand extends DefaultCommand {
  rules () {
    return {
      name: 'required|string',
      data: 'required',
			// HEADER
      'data.header.title.accessibility': 'required|string',
      'data.header.title.text': 'required|string',
			// BODY
      'data.body.type': 'required|string',
      'data.body.render.*.type': 'required|string',
      'data.body.render.*.value': 'required'
    };
  }

  async execute ({ response, request }) {
    let result = this.resultDefault();

    const inputs = request.all();
    const validation = await this.validator(inputs, this.rules());

    if (validation != null) {
      return this.responseJSON({ result: { body: validation, code: apiResponse.codes.unprocessed }, response });
    }

    let dataResult = {};
    try {
      const pagesRepository = new PagesRepository();
      const pageExists = await pagesRepository.whereName(inputs.name);

      if (pageExists) {
        await pagesRepository.updateById(pageExists.id, JSON.stringify(inputs.data));
        dataResult = await pagesRepository.whereName(inputs.name);
      } else if (!pageExists) {
        dataResult = await pagesRepository.create(inputs);
      }

      result.body = dataResult;
      result.code = apiResponse.codes.success;
    } catch (error) {
      result.body = { message: apiResponse.errors.pages.getUnprocessed };
      result.code = apiResponse.codes.unprocessed;
    }

    return this.responseJSON({ result, response });
  }
}

module.exports = PagesMutateCommand;
