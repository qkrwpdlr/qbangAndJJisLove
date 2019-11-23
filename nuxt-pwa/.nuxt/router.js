import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _31fd1017 = () => interopDefault(import('../pages/agree.vue' /* webpackChunkName: "pages/agree" */))
const _0a371828 = () => interopDefault(import('../pages/bill.vue' /* webpackChunkName: "pages/bill" */))
const _70857986 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/agree",
    component: _31fd1017,
    name: "agree"
  }, {
    path: "/bill",
    component: _0a371828,
    name: "bill"
  }, {
    path: "/",
    component: _70857986,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
