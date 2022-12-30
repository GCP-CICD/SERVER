'use strict';

const { Controller } = require('egg');
const _res = require('../lib/_res.js');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async schema() {
    const { ctx, app } = this;
    const { pageName } = ctx.request.query;
    const {} = ctx.request.body;
    const {} = ctx.params;

    const result = await app.mysql.query(
      `
      SELECT
          COLUMN_NAME,
          DATA_TYPE,
          CHARACTER_MAXIMUM_LENGTH,
          IS_NULLABLE,
          COLUMN_COMMENT,COLUMN_DEFAULT
      FROM
          information_schema.COLUMNS
      WHERE TABLE_NAME
          = ?
    `,
      [pageName]
    );

    ctx.body = new _res({ data: result });
  }
}

module.exports = HomeController;
