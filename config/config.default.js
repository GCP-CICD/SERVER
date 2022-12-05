/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1669357724151_2784';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '35.236.180.84',
    // host: '127.0.0.1',
    port: 3306,
    password: '0000',
    database: 'northwind',
    define: {
      //freezeTableName默认值为false，会自动在表名后加s
      freezeTableName: true,
      // timestamps默认值为true，会自动添加create_time和update_time
      timestamps: false,
    },
  };

  // 安全配置 （https://eggjs.org/zh-cn/core/security.html）
  config.security = {
    csrf: {
      // ????
      enable: false,
      ignoreJSON: true,
    },
    // 允许访问接口的白名单
    domainWhiteList: ['.domain.com'],
  };
  config.jwt = {
    secret: '123456',
  };
  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '35.236.180.84',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '0000',
      // 数据库名
      database: 'northwind',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};
