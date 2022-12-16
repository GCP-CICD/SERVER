'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.login.login);
  router.get('/checkToken', jwt, controller.login.checkToken); //傳入jwt middleware 驗證token
  router.get('/schema', controller.home.schema);

  router.resources('route', '/route', controller.route);
  router.resources('main', '/:pageName', controller.main);
  router.get('/:pageName/restore/:id', controller.main.restore);
};
