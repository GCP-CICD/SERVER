'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.login.login);
  router.get('/checkToken', jwt, controller.login.checkToken); //傳入jwt middleware 驗證token
  router.get('/getRoute', jwt, controller.login.getRoute);
  router.get('/getRoute2', jwt, controller.login.getRoute2);
  router.get('/schema', controller.home.schema);

  router.resources('users', '/users', controller.user);
  router.resources('employees', '/employees', controller.employees);
  router.resources('role', '/role', controller.role);
  router.resources('main', '/main/:pageName', controller.main);
};
