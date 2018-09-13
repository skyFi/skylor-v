import * as leutil from 'leutil';
import _ from 'lodash';

export default (Vue) => {
  // 1. 添加全局方法或属性
  Vue.leutil = leutil;
  Vue._ = _;
  //
  // // 2. 添加全局资源
  // Vue.directive('my-directive', {
  //   bind(el, binding, vnode, oldVnode) {
  //     // 逻辑...
  //   },
  // });
  //
  // // 3. 注入组件
  // Vue.mixin({
  //   created() {
  //     // 逻辑...
  //   },
  // });
  //
  // 4. 添加实例方法
  Vue.prototype.$leutil = leutil;
  Vue.prototype.$_ = _;
};
