'use strict';

const { Controller } = require('egg');
const _res = require('../lib/_res.js');

class LoginController extends Controller {
  // 登录
  async login() {
    const { ctx, app } = this;
    const { email, password } = ctx.request.body;

    const result = await app.mysql.query(
      'SELECT *  FROM `employees` WHERE `email_address` = ? AND `password` = ? AND status = 1',
      [email, password]
    ); // 单实例可以直接通过 app.mysql 访问

    if (result.length > 0) {
      const token = app.jwt.sign(
        //将用户的信息加密成 JWT 字符串
        {
          data: {
            email,
          },
          exp: Math.floor(Date.now() / 1000 + 60 * 60 * 7),
        },
        app.config.jwt.secret
      );

      ctx.body = new _res({ data: { info: result[0], token } });
    } else {
      ctx.body = new _res({ message: 'faild' });
    }
  }
  // 验证token，请求时在header配置 Authorization=`Bearer ${token}`
  // 特别注意：token不能直接发送，要在前面加上Bearer字符串和一个空格
  async checkToken() {
    const { ctx } = this;
    ctx.body = new _res();
  }

  async getRoute() {
    const { ctx, app } = this;
    const { id } = ctx.request.query;

    // const result = await app.mysql.query(
    //   'SELECT * FROM `role` as rl JOIN `role_route` as rr ON rl.id = rr.roleId JOIN `route` as re ON re.id = rr.routeId WHERE rl.id=?',
    //   [id]
    // );

    let result = await app.mysql.query(
      'SELECT rr.roleId, rr.routeId as parentId ,p.title,p.icon,p.name,p.path,p.component,c.id as cId,c.title as cTitle, c.name as cName,c.path as cPath,c.component as cComponent FROM (role_route as rr LEFT JOIN route as p ON p.id = rr.routeId) LEFT JOIN route_children as c ON p.id = c.parentId WHERE rr.roleId = ? ORDER BY rr.routeId',
      [id]
    );
    let route_children = [];
    let route = [];
    result.forEach((v, i, a) => {
      route_children.push({
        title: v.cTitle,
        name: v.cName,
        path: v.cPath,
        component: v.cComponent,
      });
      if (v.parentId !== a[i + 1]?.parentId) {
        route.push({
          roleId: v.roleId,
          title: v.title,
          icon: v.icon,
          name: v.name,
          path: v.path,
          component: v.component,
          children: route_children,
        });
        route_children = [];
      }
    });

    ctx.body = new _res({ data: route });
  }
  async getRoute2() {
    const { ctx, app } = this;
    const { id } = ctx.request.query;

    // const result = await app.mysql.query(
    //   'SELECT * FROM `role` as rl JOIN `role_route` as rr ON rl.id = rr.roleId JOIN `route` as re ON re.id = rr.routeId WHERE rl.id=?',
    //   [id]
    // );

    let result = await app.mysql.query(
      `SELECT p.id as pId,p.type as pType,p.title as pTitle,p.icon as pIcon,p.path as pPath,c.id as cId,c.type as cType,c.title as cTitle,c.icon as cIcon,c.path as cPath FROM (role_route as rr LEFT JOIN route2 as p ON p.id = rr.routeId) LEFT JOIN route2 as c ON c.parentId=p.id where rr.roleId =? && p.parentId=0`,
      [id]
    );

    let route_children = [];
    let route = [];
    result.forEach((v, i, a) => {
      route_children.push({
        id: v.cId,
        type: v.cType,
        title: v.cTitle,
        icon: v.cIcon,
        path: v.cPath,
      });
      if (v.pId !== a[i + 1]?.pId) {
        route.push({
          id: v.pId,
          type: v.pType,
          title: v.pTitle,
          icon: v.pIcon,
          path: v.pPath,

          children: route_children,
        });
        route_children = [];
      }
    });

    ctx.body = new _res({ data: route });
  }
}
module.exports = LoginController;
