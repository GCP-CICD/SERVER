'use strict';

const { Controller } = require('egg');
const _res = require('../lib/_res.js');
const toInt = require('../lib/toInt');
const queryFormat = require('../lib/queryFormat.js');

class EmployeesController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const queryOrigin = ctx.request.query;

    const query = queryFormat(queryOrigin);
    const data = await ctx.model.Employees.findAll(query);
    const count = (
      await app.mysql.query('SELECT COUNT(*) FROM ? ', [
        ctx.model.Employees.name,
      ])
    )[0]['COUNT(*)'];
    ctx.body = new _res({ data: { data, count } });
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = new _res({
      data: await ctx.model.Employees.findByPk(toInt(ctx.params.id)),
    });
  }

  async create() {
    const ctx = this.ctx;
    const { name, age } = ctx.request.body;
    const role = await ctx.model.Employees.create({ name, age });
    ctx.status = 201;
    ctx.body = new _res({ data: role });
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const role = await ctx.model.Employees.findByPk(id);
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
    const role = await ctx.model.Employees.findByPk(id);
    if (!role) {
      ctx.status = 404;
      return;
    }

    await role.destroy();
    ctx.status = 200;
  }
}

module.exports = EmployeesController;
