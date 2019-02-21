
import VueRouter from 'vue-router';
import Index from '../views/index';
import HelloWorld from '../views/HelloWorld';
/******************** 页面模块  ********************/
let routes = [
  /**************************** 微店 *******************************/
  {
    name: 'index',
    path: '/index',
    component: Index
  },{
    name: 'helloWorld',
    path: '/helloWorld',
    component: HelloWorld
  },
  {
    path: '/',
    component: HelloWorld
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.documentElement.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  }
})


export default router
