import Vue from 'vue';
import Toasted from 'vue-toasted';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTimes,
  faCheck,
  faSignOutAlt,
  faSearch,
  faTree,
  faKey,
  faSyncAlt,
  faIndent,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueCollapse from 'vue2-collapse';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCommonsPlugins from './plugins/commons';
import VueConfigPlugin from './plugins/config';
import VueAxiosPlugin from './plugins/axios';

// 引入全局样式文件
import './var.css';
import './index.css';

// 添加 font-awesome 图标支持
library.add(faTimes, faCheck, faSignOutAlt, faSearch, faTree, faKey, faSyncAlt, faIndent);
Vue.component('icon', FontAwesomeIcon);

// 系统配置
Vue.config.productionTip = false;

// 添加插件
Vue.use(VueConfigPlugin, CONFIG);
Vue.use(Toasted, { iconPack: 'fontawesome', position: 'top-center', duration: 3000 });
Vue.use(VueAxiosPlugin);
Vue.use(VueCommonsPlugins);
Vue.use(VueCollapse);

router.beforeEach((to, from, next) => {
  const ticket = localStorage.getItem('ticket');
  if (ticket) {
    if (['/login'].indexOf(to.path) !== -1) {
      next('/');
    } else {
      next();
    }
  } else if (['/login'].indexOf(to.path) !== -1) {
    next();
  } else {
    next('/login');
  }
});

// 注册实例
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
