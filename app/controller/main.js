'use strict';

const { Controller } = require('egg');
const _res = require('../lib/_res.js');
const toInt = require('../lib/toInt');
const queryFormat = require('../lib/queryFormat.js');

class MainController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { pageName } = ctx.params;
    const queryOrigin = ctx.request.query;
    const query = queryFormat(queryOrigin);

    const data = await ctx.model[
      pageName[0].charAt(0).toUpperCase() + pageName.slice(1)
    ].findAll(query);

    const syntax = `SELECT COUNT(*) FROM ?`.replace('?', pageName);
    const count = (await app.mysql.query(syntax))[0]['COUNT(*)'];

    ctx.body = new _res({ data: { data, count } });
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = new _res({
      data: await ctx.model[
        pageName[0].charAt(0).toUpperCase() + pageName.slice(1)
      ].findByPk(toInt(ctx.params.id)),
    });
  }

  async create() {
    const ctx = this.ctx;
    const { name, age } = ctx.request.body;
    const data = await ctx.model[
      pageName[0].charAt(0).toUpperCase() + pageName.slice(1)
    ].create({ name, age });
    ctx.status = 201;
    ctx.body = new _res({ data: data });
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const data = await ctx.model[
      pageName[0].charAt(0).toUpperCase() + pageName.slice(1)
    ].findByPk(id);
    if (!data) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await data.update({ name, age });
    ctx.body = new _res({ data: data });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const data = await ctx.model[
      pageName[0].charAt(0).toUpperCase() + pageName.slice(1)
    ].findByPk(id);
    if (!data) {
      ctx.status = 404;
      return;
    }

    await data.destroy();
    ctx.status = 200;
  }
}

module.exports = MainController;
