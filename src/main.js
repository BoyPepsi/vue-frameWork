import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import VueWechatTitle from 'vue-wechat-title';
import component from '@/components'; // 共用组件
import '@/permissions/index.js'; // 共用指令
import publicFilters from '@/filters/index.js'; // 共用过滤器
import all from '@/helps/help.js'; // 共用帮助类
Vue.config.productionTip = false;
import '@/plugins/element.js';
import '@/plugins/freedomen.js';
import '@/plugins/orgchart.js';
import data from '@/json/data.json';
Vue.use(component);
Vue.use(all, router);
Vue.use(VueWechatTitle);
Vue.prototype.commonData = data;
for (let key in publicFilters) {
  Vue.filter(key, publicFilters[key]);
}
new Vue({
  store,
  router,
  render: h => {return h(App);}
}).$mount('#app');
