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

    const getData =
      ctx.model[
        pageName[0].charAt(0).toUpperCase() + pageName.slice(1)
      ].findAll(query);

    const syntax = `SELECT COUNT(*) FROM ?`.replace('?', pageName);
    const getCount = app.mysql.query(syntax);

    const [data, count] = await Promise.all([getData, getCount]);

    ctx.body = new _res({ data: { data, count: count[0]['COUNT(*)'] } });
  }

  async show() {
    const ctx = this.ctx;

    const { pageName, id = toInt(ctx.params.id) } = ctx.params;
    // const id = toInt(ctx.params.id);

    ctx.body = new _res({
      data: await ctx.model[
        pageName[0].charAt(0).toUpperCase() + pageName.slice(1)
      ].findByPk(id),
    });
  }

  async create() {
    const ctx = this.ctx;
    const { pageName } = ctx.params;

    // const{ id,name,... } = ctx.request.body; 省略這段改為下面的
    const body = ctx.request.body;
    console.log(body);
    const data = await ctx.model[
      pageName[0].charAt(0).toUpperCase() + pageName.slice(1)
    ].create(body);
    ctx.status = 201;
    ctx.body = new _res({ data: data });
  }

  async update() {
    const ctx = this.ctx;
    const { pageName, id = toInt(ctx.params.id) } = ctx.params;

    const data = await ctx.model[
      pageName[0].charAt(0).toUpperCase() + pageName.slice(1)
    ].findByPk(id);
    if (!data) {
      ctx.status = 404;
      return;
    }

    const body = ctx.request.body;
    await data.update(body);
    ctx.body = new _res({ data });
  }

  async destroy() {
    const ctx = this.ctx;
    const { force } = ctx.request.query;

    const { pageName } = ctx.params;

    const id = toInt(ctx.params.id);
    const data = await ctx.model[
      pageName[0].charAt(0).toUpperCase() + pageName.slice(1)
    ].findByPk(id, { paranoid: false }); // 包括软删除
    if (!data) {
      ctx.status = 404;
      return;
    }
    if (force) {
      await data.destroy({ force: true });
    } else {
      await data.destroy();
    }
    ctx.body = new _res({ data });
  }
  async restore() {
    const ctx = this.ctx;
    const { pageName } = ctx.params;
    const id = toInt(ctx.params.id);

    const data = await ctx.model[
      pageName[0].charAt(0).toUpperCase() + pageName.slice(1)
    ].findByPk(id, { paranoid: false });
    if (!data) {
      ctx.status = 404;
      return;
    }

    await data.restore();
    ctx.body = new _res({ data });
  }
}

module.exports = MainController;
