'use strict';

const { Controller } = require('egg');
const _res = require('../lib/_res.js');
const toInt = require('../lib/toInt');
const queryFormat = require('../lib/queryFormat.js');

class RouteController extends Controller {
  async index() {
    const { ctx, app } = this;
    const role_id = ctx.cookies.get('role_id');

    const getRoute = app.mysql.query(
      `
      SELECT
        p.id AS parentId,
        p.parentId AS pparentId,
        p.title AS pTitle,
        p.icon AS pIcon,
        p.path AS pPath,
        c.id AS cId,
        c.parentId AS cparentId,
        c.title AS cTitle,
        c.icon AS cIcon,
        c.path AS cPath,
        rr.permissionView,
        rr.permissionEdit,
        rr.permissionDelete
      FROM
      (
        role_route AS rr
      LEFT JOIN route AS p
      ON
        p.id = rr.routeId
      )
      LEFT JOIN 
        route AS c
      ON
        c.parentId = p.id
      WHERE
        rr.roleId = ? && p.parentId = 0`,
      [role_id]
    );
    const getCount = app.mysql.query(
      `SELECT COUNT(*) FROM route WHERE parentId = 0`
    );

    const [route, count] = await Promise.all([getRoute, getCount]);
    let route_children = [];
    let newRoute = [];
    route.forEach((v, i, a) => {
      route_children.push({
        id: v.cId,
        parentId: v.cparentId,
        title: v.cTitle,
        icon: v.cIcon,
        path: v.cPath,
        permissionView: v.permissionView,
        permissionEdit: v.permissionEdit,
        permissionDelete: v.permissionDelete,
      });
      if (v.parentId !== a[i + 1]?.parentId) {
        newRoute.push({
          id: v.parentId,
          parentId: v.pparentId,
          title: v.pTitle,
          icon: v.pIcon,
          path: v.pPath,

          children: route_children,
        });
        route_children = [];
      }
    });

    ctx.body = new _res({
      data: { data: newRoute, count: count[0]['COUNT(*)'] },
    });
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

module.exports = RouteController;
