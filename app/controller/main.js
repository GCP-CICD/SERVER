'use strict';

const { Controller } = require('egg');
const _res = require('../lib/_res.js');
const toInt = require('../lib/toInt');
const formatPayload = require('../lib/formatPayload.js');

class MainController extends Controller {
  async index() {
    console.log('get');
    const { ctx, app } = this;
    const { pageName } = ctx.params;

    const query = formatPayload({ type: 'get', payload: ctx.request.query });

    const getData =
      ctx.model[
        pageName[0].charAt(0).toUpperCase() + pageName.slice(1)
      ].findAll(query);

    const getCount =
      ctx.model[pageName[0].charAt(0).toUpperCase() + pageName.slice(1)].count(
        query
      );

    const [data, count] = await Promise.all([getData, getCount]);

    ctx.body = new _res({ data: { data, count } });
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
    console.log('post');
    const ctx = this.ctx;
    const { pageName } = ctx.params;

    // const{ id,name,... } = ctx.request.body; 省略這段改為下面的
    const body = formatPayload({ type: 'post', payload: ctx.request.body });

    const data = await ctx.model[
      pageName[0].charAt(0).toUpperCase() + pageName.slice(1)
    ].create(body);
    ctx.status = 201;
    ctx.body = new _res({ data: data });
  }

  async update() {
    console.log('put');

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
    console.log('deleted');

    //軟刪除(1.model的 paranoid: true  2.資料表要有deleted_at)
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
    console.log('restore');

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
