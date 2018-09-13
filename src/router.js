import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/about',
      component: Home,
      children: [
        {
          path: '/about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },

  ],
});
