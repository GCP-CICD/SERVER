'use strict';

const { Controller } = require('egg');
const _res = require('../lib/_res.js');
const toInt = require('../lib/toInt');
const queryFormat = require('../lib/queryFormat.js');

class RoleController extends Controller {
  async index() {
    const { ctx, app } = this;

    const { Op } = app.Sequelize;
    const queryOrigin = ctx.request.query;

    const query = queryFormat(queryOrigin);

    ctx.body = new _res({ data: await ctx.model.Role.findAll(query) });
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = new _res({
      data: await ctx.model.Role.findByPk(toInt(ctx.params.id)),
    });
  }

  async create() {
    const ctx = this.ctx;
    const { name, test } = ctx.request.body;
    try {
      const role = await ctx.model.Role.create({ name, test });
      ctx.status = 201;
      ctx.body = new _res({ data: role });
    } catch (error) {
      ctx.body = new _res({ code: '400', data: error });
    }
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const role = await ctx.model.Role.findByPk(id);
    if (!role) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await role.update({ name, age });
    ctx.body = new _res({ data: role });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const role = await ctx.model.Role.findByPk(id);
    if (!role) {
      ctx.status = 404;
      return;
    }

    await role.destroy();
    ctx.status = 200;
  }
}

module.exports = RoleController;
