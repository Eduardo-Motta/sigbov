import animal from './animal'
import farm from './farm'
import home from './home'
import lot from './lot'
import managment from './managment'
import pasture from './pasture'
import stock from './stock'

const routes = [
  {
    path: '/auth',
    beforeEnter: (_to, _from, next) => localStorage.getItem('sigbov:token') ? next('/') : next(),
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: 'signup', component: () => import('pages/auth/Signup.vue') },
      { path: 'signin', component: () => import('pages/auth/Signin.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Theme.vue'),
    beforeEnter: (_to, _from, next) => localStorage.getItem('sigbov:token') ? next() : next('/auth/signin'),
    children: [
      ...home,
      ...animal,
      ...farm,
      ...lot,
      ...managment,
      ...pasture,
      ...stock
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
