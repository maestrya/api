'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { project: 'Simian' }
})

const dir = 'App/Domain/Commands';

Route.group(() => {
  Route.get('/stats', `${dir}/Simian/get.execute`)
  Route.post('/simian', `${dir}/Simian/create.execute`)
}).prefix('api')