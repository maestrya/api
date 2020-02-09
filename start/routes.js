'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { author: 'velrino', project: 'AutoFront' };
});

const dir = 'App/Domain/Commands';

Route.group(() => {
  Route.get('/', `${dir}/Pages/get.execute`);
  Route.post('/', `${dir}/Pages/create.execute`);
}).prefix('api/pages');
