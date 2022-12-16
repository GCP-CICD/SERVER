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
      ctx.cookies.set('role_id', result[0].role_id);
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
}
module.exports = LoginController;
