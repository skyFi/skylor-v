import axios from 'axios';
import Vue from 'vue';

export default () => {
  axios.default.timeout = 5000;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  const cacheBaseURL = localStorage.getItem('api');
  const instance = axios.create({
    baseURL: cacheBaseURL || '/dbdoc',
  });
  instance.defaults.headers.post['Content-Type'] = 'application/json';

  axios.interceptors.request.use = instance.interceptors.request.use;
  instance.interceptors.request.use((config) => {
    const ticket = localStorage.getItem('ticket');
    if (ticket) {
      config.headers['X-smartsa-ticket'] = ticket;
    }
    return config;
  }, err => Promise.reject(err));

  // axios拦截响应
  instance.interceptors.response.use((response) => {
    const { data } = response;
    if (data && data.code === 0) {
      return data.data;
    }
    Vue.toasted.error(data.msg || '服务器错误');
    return null;
  }, (err) => {
    Vue.toasted.error(err.response && err.response.data ? err.response.data.msg : err.message);
    return null;
  });
  return {
    // 用户登录
    login({ account, captcha, identityType = 'STAFF' }) {
      return instance.post('/user/login', { account, captcha, identityType });
    },
    // 发送验证码
    sendCaptcha(phone) {
      return instance.post('/user/captcha', { phone });
    },
    // 登出
    logout() {
      return instance.post('/user/logout');
    },
    // 获取数据库结构数据
    getTables(refresh) {
      return instance.get('/util/tables/docs', { params: { refresh } });
    },
  };
};
